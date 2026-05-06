import { Page, Locator, expect } from '@playwright/test';
import { Base } from './Base.page';
import { MvidTapBarComponent } from '../components/MvidTapBar.component';

export class MvideoHome extends Base {
  readonly tapBar: MvidTapBarComponent;
  protected readonly path = '/';

  constructor(page: Page) {
    super(page);
    this.tapBar = new MvidTapBarComponent(page);
  }

  // ── First-Visit Modals ──

  get locationConfirmation() {
    const container = this.page.locator('.location-tooltip-content').first();
    return {
      container,
      confirmButton: container.getByRole('button', { name: 'Все верно' }),
      changeCity: container.getByText('Выбрать город', { exact: true }),
    };
  }

  get cookieBanner() {
    const container = this.page.locator('mvid-cookie-notification');
    return {
      container,
      acceptButton: container.getByRole('button', { name: 'Понятно' }),
    };
  }

  get promoBanner() {
    const container = this.page.locator('.insider-banner-wrapper').first();
    return {
      container,
      closeButton: container.getByRole('button', { name: 'Закрыть' }),
    };
  }

  // ── Header ──

  get logo(): Locator {
    return this.page.getByRole('link', { name: 'Логотип сайта' });
  }

  get searchInput(): Locator {
    return this.page.getByPlaceholder('Поиск в М.Видео');
  }

  get searchButton(): Locator {
    return this.page.locator('button.main-search__submit');
  }

  get catalogButton(): Locator {
    return this.page.getByRole('button', { name: 'Каталог' });
  }

  get promo(): Locator {
    return this.page.getByRole('img', { name: 'Скидка клиента до -90%' });
  }

  // ── Top Bar ──

  get topBar() {
    const container = this.page.locator('.top-navbar');
    return {
      location: container.getByText('Москва').first(),
      stores: container.getByRole('link', { name: 'Магазины', exact: true }),
      installation: container.getByRole('link', { name: 'Установка и ремонт' }),
      mCombo: container.getByRole('link', { name: 'М.Комбо' }),
      mClick: container.getByRole('link', { name: 'М.Клик' }),
    };
  }

  // ── Category Navigation ──

  get categoryNav(): Locator {
    return this.page.locator('div.slide-panel__content');
  }

  categoryByName(name: string): Locator {
    return this.categoryNav.getByRole('link', { name });
  }

  // ── Methods ──

  /**
   * Dismiss all first-visit popups (location confirmation, cookie banner, promo banner).
   * Each is handled gracefully — if it's not visible within a short timeout, it's skipped.
   */
  async dismissFirstVisitPopups(): Promise<void> {
    // Location confirmation
    const locationBtn = this.locationConfirmation.confirmButton;
    try {
      await locationBtn.waitFor({ state: 'visible', timeout: 3000 });
      await locationBtn.click();
    } catch (e) {
      // Not visible or already dismissed
    }

    // Cookie banner
    const cookieBtn = this.cookieBanner.acceptButton;
    try {
      await cookieBtn.waitFor({ state: 'visible', timeout: 2000 });
      await cookieBtn.click();
    } catch (e) {
      // Not visible or already dismissed
    }

    // Promo banner
    const promoClose = this.promoBanner.closeButton;
    try {
      await promoClose.waitFor({ state: 'visible', timeout: 2000 });
      await promoClose.click();
    } catch (e) {
      // Not visible or already dismissed
    }
  }

  async pageIsLoaded(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.catalogButton).toBeVisible();
  }

  async topBarIsVisible(): Promise<void> {
    await expect(this.topBar.location).toBeVisible();
    await expect(this.topBar.stores).toBeVisible();
    await expect(this.topBar.installation).toBeVisible();
    await expect(this.topBar.mCombo).toBeVisible();
    await expect(this.topBar.mClick).toBeVisible();
  }
}
