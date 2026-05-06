import { Page, Locator, expect } from '@playwright/test';
import { Base } from './Base.page';
import { MvidTapBarComponent } from '../components/MvidTapBar.component';

export class MvideoSearchResults extends Base {
  readonly tapBar: MvidTapBarComponent;
  protected readonly path = '/search';

  constructor(page: Page) {
    super(page);
    this.tapBar = new MvidTapBarComponent(page);
  }

  // ── Search Results Page ──

  get searchHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get resultCountText(): Locator {
    return this.page.locator('.listing-page-title__count');
  }

  /**
   * Product card links — each card is an `<a>` with name starting with "Открыть карточку товара".
   */
  get productCardLinks(): Locator {
    return this.page.getByRole('link', { name: /Открыть карточку товара/ });
  }

  productCardLink(index: number): Locator {
    return this.productCardLinks.nth(index);
  }

  /**
   * Product images inside the card links.
   */
  productImage(index: number): Locator {
    return this.productCardLink(index).locator('.active-default').getByRole('img');
  }

  /**
   * Gets the Add to Cart button for a specific product card.
   * We scope this to the product card and use a generic regex so the locator
   * remains stable before and after the text changes from 'В корзину' to 'В корзине'.
   */
  addToCartButton(index: number): Locator {
    return this.productCardLink(index).getByRole('button', { name: /В корзин[уе]/ });
  }

  get noResultsMessage(): Locator {
    return this.page.getByText('По данным параметрам фильтров товары не найдены');
  }

  get filterButtons() {
    return {
      popular: this.page.getByRole('button', { name: 'Популярные' }),
      allFilters: this.page.getByRole('button', { name: 'Все фильтры' }),
      price: this.page.getByRole('button', { name: 'Цена' }),
      category: this.page.getByRole('button', { name: 'Категория' }),
      brand: this.page.getByRole('button', { name: 'Бренд' }),
    };
  }

  // ── Methods ──

  /**
   * Perform search from the current page by typing into the search bar and pressing Enter.
   */
  async searchFor(query: string): Promise<void> {
    const searchInput = this.page.getByPlaceholder('Поиск в М.Видео');
    await searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Extract product name from the card link's accessible name.
   * The link name format is: "Открыть карточку товара <Product Name>"
   */
  async getProductName(index: number): Promise<string> {
    const linkName
      = (await this.productCardLink(index).getAttribute('aria-label')) ?? (await this.productCardLink(index).innerText());

    // Mvideo prepends this text for screen readers (accessibility); we remove it to get the clean product name.
    const screenReaderPrefix = /Открыть карточку товара\s*/i;
    return linkName.replace(screenReaderPrefix, '').trim();
  }

  /**
   * Verifies if a product name contains at least one keyword from the search query.
   */
  async isProductRelevant(index: number, searchQuery: string): Promise<boolean> {
    const productName = await this.getProductName(index);
    const keywordsArray = searchQuery.toLowerCase().split(' ');
    return keywordsArray.some(keyword => productName.toLowerCase().includes(keyword));
  }

  async pageIsLoaded(): Promise<void> {
    await expect(this.searchHeading).toBeVisible();
    await expect(this.productCardLinks.first()).toBeVisible();
  }

  async addItemToCart(cardIndex: number): Promise<string> {
    const cardItemName = await this.getProductName(cardIndex);
    await this.addToCartButton(cardIndex).click();
    await expect(this.addToCartButton(cardIndex)).toHaveText(/В корзине/);
    await expect(this.tapBar.cartBubble).toHaveText('1');
    await this.tapBar.cart.hover();
    const tooltipText = this.tapBar.cartTooltipItems;
    await expect(tooltipText).toHaveText(cardItemName);
    return cardItemName;
  }
}
