import { test, expect } from '../../util/fixtures';
import { SEARCH_QUERIES } from '../../data/mvideo.data';

test.describe('Search and add Item to the cart', () => {
  test.beforeEach('navigate to home page', async ({ mvideoHome }) => {
    await mvideoHome.open();
    await mvideoHome.dismissFirstVisitPopups();
  });

  test.describe('Happy Path — valid product query', () => {
    test.beforeEach('perform search', async ({ mvideoSearch }) => {
      await mvideoSearch.searchFor(SEARCH_QUERIES.ROBOT_VACUUM);
    });

    test('search results page loads with relevant products', async ({ mvideoSearch, cartPage }) => {
      let cardItemName: string = '';

      await test.step('verify URL contains search path', async () => {
        await expect(mvideoSearch.page).toHaveURL(`/search?q=${SEARCH_QUERIES.ROBOT_VACUUM}`);
      });

      await test.step('verify heading displays the search query', async () => {
        await expect(mvideoSearch.searchHeading).toContainText(SEARCH_QUERIES.ROBOT_VACUUM);
      });

      await test.step('verify result count is shown', async () => {
        await expect(mvideoSearch.resultCountText).toBeVisible();
      });

      await test.step('verify product cards are displayed', async () => {
        await expect(mvideoSearch.productCardLinks.first()).toBeVisible({ timeout: 10000 });
        const cardCount = await mvideoSearch.productCardLinks.count();
        expect(cardCount).toBeGreaterThan(0);
      });

      await test.step('verify first product is relevant to search query', async () => {
        const isRelevant = await mvideoSearch.isProductRelevant(0, SEARCH_QUERIES.ROBOT_VACUUM);
        expect(isRelevant).toBe(true);
      });

      await test.step('adds 1 item to the cart', async () => {
        cardItemName = await mvideoSearch.addItemToCart(0);
        await mvideoSearch.tapBar.cartTooltipGoToCartBtn.click();
      });

      await test.step('verify cart page has added item', async ({}) => {
        await expect(cartPage.cartItems).toContainText(cardItemName);
      });
    });

    test('search input retains the query text', async ({ mvideoHome }) => {
      await test.step('verify search input shows the searched query', async () => {
        await expect(mvideoHome.searchInput).toHaveValue(SEARCH_QUERIES.ROBOT_VACUUM);
      });
    });
  });

  test.describe('Negative Path — query for nonexisting items @mvideomock', () => {
    test('nonsense query shows no results or zero relevant products', async ({ mvideoSearch }) => {
      await mvideoSearch.searchFor(SEARCH_QUERIES.NONSENSE);
      await expect(mvideoSearch.page).toHaveURL(`/search?q=${SEARCH_QUERIES.NONSENSE}`);

      await test.step('verify no results message is displayed', async () => {
        await expect(mvideoSearch.noResultsMessage).toBeVisible();
      });
    });

    test('API mocking returns 0 items for "Робот пылесос" query and shows no results message', async ({
      mvideoSearch,
    }) => {
      await mvideoSearch.page.route('/bff/products', async (route) => {
        await route.fulfill({
          status: 204,
        });
      });

      await mvideoSearch.searchFor(SEARCH_QUERIES.ROBOT_VACUUM);
      await expect(mvideoSearch.noResultsMessage).toBeVisible();
    });
  });
});
