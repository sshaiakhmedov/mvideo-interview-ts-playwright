import { Page, Locator } from '@playwright/test';

export class BottomNavBarComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    // The main wrapper for these Nav bar component
    this.container = page.locator('.app-header-bottom.app-header-columns');
  }

  get allPromovtions(): Locator {
    return this.page.getByRole('link', { name: 'ВСЕ АКЦИИ' });
  }
}
