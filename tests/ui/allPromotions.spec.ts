import { test, expect } from '../../util/fixtures';
import { skipOnCICD } from '../../util/helpers';

test.describe('All Promotions', () => {
  skipOnCICD('Skipped on CI due to Mvideo anti-bot protections blocking datacenter IPs.');

  test.beforeEach('Got to landing page', async ({ mvideoHome }) => {
    await mvideoHome.open();
    await mvideoHome.dismissFirstVisitPopups();
  });

  test('Click on Nav Bar menu opens new page in the same tab', async ({ mvideoHome, allPromotionsPage }) => {
    await test.step('Navigate to All Promotions page', async () => {
      await mvideoHome.bottomNavBar.allPromovtions.click();
      await allPromotionsPage.pageIsLoaded();
    });

    await test.step('Verify breadcrumbs are visible', async () => {
      await expect(allPromotionsPage.promotionsBreadcrumbs.main).toHaveAttribute('href', '/');
      await expect(allPromotionsPage.promotionsBreadcrumbs.allPromotions).toHaveAttribute('href', '#');
    });

    await test.step('Verify promo hub list container is visible', async () => {
      await expect(allPromotionsPage.promoHubList.container).toBeVisible();
    });
  });

  test('Click on "Главная" breadcrumb leads to a Home page', async ({ allPromotionsPage, mvideoHome }) => {
    await mvideoHome.bottomNavBar.allPromovtions.click();
    await allPromotionsPage.promotionsBreadcrumbs.main.click();
    await mvideoHome.pageIsLoaded();
  });
});
