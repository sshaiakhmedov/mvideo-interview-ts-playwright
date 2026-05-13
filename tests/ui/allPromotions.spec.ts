import { test, expect } from '../../util/fixtures';
import { skipOnCICD } from '../../util/helpers';

test.describe('All Promotions', () => {
  skipOnCICD('Skipped on CI due to Mvideo anti-bot protections blocking datacenter IPs.');

  test.beforeEach('Got to landing page', async ({ mvideoHome }) => {
    await mvideoHome.open();
    await mvideoHome.dismissFirstVisitPopups();
  });

  test('Click on Nav Bar menu open new page in the same tab', async ({ mvideoHome, allPromotionsPage }) => {
    await mvideoHome.bottomNavBar.allPromovtions.click();
    await allPromotionsPage.pageIsLoaded();
    await expect(allPromotionsPage.page).toHaveURL(allPromotionsPage.path);
  });
});
