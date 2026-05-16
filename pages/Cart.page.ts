import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { Base } from './Base.page';

import { MvidTapBarComponent } from '../components/MvidTapBar.component';

export class CartPage extends Base {
  readonly tapBar: MvidTapBarComponent;
  protected readonly path = '/cart/';

  constructor(page: Page) {
    super(page);
    this.tapBar = new MvidTapBarComponent(page);
  }

  override async open(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.pageIsLoaded();
  }

  override async pageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.path);
  }

  get cartItems(): Locator {
    return this.page.locator('.cart-items');
  }

  get chat() {
    const container = this.page.getByRole('button', { name: 'Чат' });
    return {
      container,
      icon: container.locator('[type=chat]'),
      label: container.locator('chat-title').getByText('Чат'),
    };
  }
}
