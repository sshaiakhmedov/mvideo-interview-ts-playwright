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

  override async pageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.path);
  }
}
