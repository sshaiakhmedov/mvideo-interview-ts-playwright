import { test, expect } from '../../util/fixtures';
import { skipOnCICD } from '../../util/helpers';

test.describe('Mvideo Landing Page — Logged-Out User', () => {
  skipOnCICD('Skipped on CI due to Mvideo anti-bot protections blocking datacenter IPs.');

  test.beforeEach('navigate to home page', async ({ mvideoHome }) => {
    await mvideoHome.open();
  });

  test.describe('First-Visit Modals', () => {
    test('location confirmation popup is displayed and can be accepted', async ({ mvideoHome }) => {
      await test.step('verify location confirmation popup is visible', async () => {
        await expect(mvideoHome.locationConfirmation.confirmButton).toBeVisible();
        await expect(mvideoHome.locationConfirmation.changeCity).toBeVisible();
      });

      await test.step('accept "Все верно" and verify popup disappears', async () => {
        await mvideoHome.locationConfirmation.confirmButton.click();
        await expect(mvideoHome.locationConfirmation.container).toBeHidden();
      });
    });

    test('cookie consent banner is displayed and can be dismissed', async ({ mvideoHome }) => {
      await test.step('dismiss location popup first', async () => {
        await mvideoHome.dismissFirstVisitPopups();
      });

      await test.step('verify cookie banner was dismissed', async () => {
        await expect(mvideoHome.cookieBanner.acceptButton).toBeHidden();
      });
    });
  });

  test.describe('Header Smoke', () => {
    test.beforeEach('dismiss popups for clean header testing', async ({ mvideoHome }) => {
      await mvideoHome.dismissFirstVisitPopups();
    });

    test('logo, search bar, and catalog button are visible', async ({ mvideoHome }) => {
      await test.step('verify core header elements', async () => {
        await expect(mvideoHome.logo).toBeVisible();
        await expect(mvideoHome.searchInput).toBeVisible();
        await expect(mvideoHome.catalogButton).toBeVisible();
      });
    });

    test('all header action links are visible for logged-out user', async ({ mvideoHome }) => {
      await test.step('verify action links in header', async () => {
        await expect(mvideoHome.tapBar.orderStatus).toBeVisible();
        await expect(mvideoHome.tapBar.login).toBeVisible();
        await expect(mvideoHome.tapBar.comparison).toBeVisible();
        await expect(mvideoHome.tapBar.favorites).toBeVisible();
        await expect(mvideoHome.tapBar.cart).toBeVisible();
      });
    });

    test('top bar shows location and navigation links', async ({ mvideoHome }) => {
      await test.step('verify top bar links', async () => {
        await expect(mvideoHome.topBar.location).toBeVisible();
        await expect(mvideoHome.topBar.stores).toBeVisible();
        await expect(mvideoHome.topBar.installation).toBeVisible();
        await expect(mvideoHome.topBar.mCombo).toBeVisible();
        await expect(mvideoHome.topBar.mClick).toBeVisible();
      });
    });

    test('category navigation bar displays key categories', async ({ mvideoHome }) => {
      await test.step('verify category links are present', async () => {
        await expect(mvideoHome.categoryByName('Телевизоры')).toBeVisible();
        await expect(mvideoHome.categoryByName('Холодильники')).toBeVisible();
        await expect(mvideoHome.categoryByName('Ноутбуки')).toBeVisible();
      });
    });
  });
});
