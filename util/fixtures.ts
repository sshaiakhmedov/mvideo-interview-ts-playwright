import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager';
import { MvideoHome, MvideoSearchResults, CartPage, AllPromotionsPage } from '../pages';

type MyFixtures = {
  api: ApiManager;
  mvideoHome: MvideoHome;
  mvideoSearch: MvideoSearchResults;
  cartPage: CartPage;
  allPromotionsPage: AllPromotionsPage;
};

const test = base.extend<MyFixtures>({
  // PO fixtures
  api: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },
  allPromotionsPage: async ({ page }, use) => {
    const allPromotionsPage = new AllPromotionsPage(page);
    await use(allPromotionsPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  mvideoHome: async ({ page }, use) => {
    const mvideoHome = new MvideoHome(page);
    await use(mvideoHome);
  },
  mvideoSearch: async ({ page }, use) => {
    const mvideoSearch = new MvideoSearchResults(page);
    await use(mvideoSearch);
  },
});

export { test, expect };
