import { Base } from './Base.page';
import { type Page, type Locator, expect } from '@playwright/test';
import { BottomNavBarComponent } from '../components/BottomNavBar.component';

export class AllPromotionsPage extends Base {
  readonly bottomNavBar: BottomNavBarComponent;
  readonly path = '/vse-akcii?from=under_search';

  constructor(page: Page) {
    super(page);
    this.bottomNavBar = new BottomNavBarComponent(page);
  }

  get promotionsBreadcrumbs() {
    const container = this.page.locator('mvid-breadcrumbs');
    return {
      container,
      main: container.getByRole('link', { name: 'Главная' }),
      allPromotions: container.getByRole('link', { name: 'Все акции' }),
    };
  }

  get promoHubList() {
    const container = this.page.locator('.promo-hub__list').first();
    return {
      container,
      items: container.locator('.promo-hub__item'),
    };
  }

  override async pageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.path);
    await expect(this.promotionsBreadcrumbs.container).toBeVisible();
  }
}
