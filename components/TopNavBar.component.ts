import { Page, Locator } from '@playwright/test';

export class TopNavBarComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.app-header-top app-header-columns');
  }

  get location() {
    const container = this.page.locator('.location').first();
    return {
      container,
      logo: container.locator('.location-icon'),
      cityLink: container.locator('.location-text.top-navbar-lin'),
    };
  }

  get stores(): Locator {
    return this.container.getByRole('link', { name: 'Магазины' });
  }
}
