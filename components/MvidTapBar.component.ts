import { Page, Locator } from '@playwright/test';

export class MvidTapBarComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    // The main wrapper for these panel elements is .mvid-tap-bar
    this.container = page.locator('.mvid-tap-bar').first();
  }

  get orderStatus(): Locator {
    return this.page.getByRole('link', { name: 'Статус заказа' });
  }

  get login(): Locator {
    return this.page.getByRole('link', { name: 'Войти', exact: true });
  }

  get comparison(): Locator {
    return this.page.getByRole('link', { name: 'Сравнение' });
  }

  get favorites(): Locator {
    return this.page.getByRole('link', { name: 'Избранное' });
  }

  get cart(): Locator {
    return this.page.getByRole('link', { name: 'Корзина' }).first();
  }

  get cartBubble(): Locator {
    // The bubble badge is rendered in the main header's cart link, not inside .mvid-tap-bar
    return this.page.getByRole('link', { name: 'Корзина' }).locator('mvid-bubble').first();
  }

  /** Tooltip that appears on cart hover, showing added items. Sibling of the cart link. */
  get cartTooltip(): Locator {
    return this.page.locator('mvid-header-icon-tooltip .tooltip__item');
  }

  /** Product list inside the cart tooltip */
  get cartTooltipItems(): Locator {
    return this.cartTooltip.locator('.items');
  }

  /** "В корзину" link inside the tooltip to navigate to the cart page */
  get cartTooltipGoToCartBtn(): Locator {
    return this.cartTooltip.locator('a[href*="cart"]');
  }
}
