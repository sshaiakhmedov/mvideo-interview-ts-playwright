import type { Page, Locator, FrameLocator } from '@playwright/test';

export class ChatComponent {
  readonly page: Page;
  readonly container: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.frameLocator('#__threadswidget_chat__iframe');
  }
}
