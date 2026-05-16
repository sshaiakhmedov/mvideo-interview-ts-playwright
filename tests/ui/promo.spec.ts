import { test, expect } from '../../util/fixtures';
import { skipOnCICD } from '../../util/helpers';

test.describe('Promo', () => {
  skipOnCICD('Skipped on CI due to Mvideo anti-bot protections blocking datacenter IPs.');

  test.beforeEach('Go to landing page', async ({ mvideoHome }) => {
    await test.step('Open Mvideo Home Page', async () => {
      await mvideoHome.open();
    });
  });

  // TODO: keep changing
  test.skip('Verify Promo page opens on the same tab with correct theme @prp', async ({ mvideoHome }) => {
    const promoHref = (await mvideoHome.promo.link.getAttribute('href')) as string;
    await mvideoHome.promo.image.click();
    console.log(promoHref);
    await expect(mvideoHome.page).toHaveURL(promoHref);
  });
});
