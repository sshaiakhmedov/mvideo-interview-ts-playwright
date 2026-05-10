import { Product } from '../../../api/schemas/FakeStore.schema';
import { test, expect } from '../../../util/fixtures';
import { ProductSchema, ProductNegative } from '../../../api/schemas/FakeStore.schema';

test.describe('POST /products', () => {
  let payload: Product;
  let productId1: Product;

  test.beforeEach('Verify new products does not exist in the DB', async ({ api }) => {
    payload = {
      id: 21,
      title: 'Test01',
      price: 100,
      description: 'Desc',
      category: 'PW',
      image: 'http://example.com',
    };

    const resp = await api.fakeStore.getProducts();
    expect(resp.body.some((obj) => obj.id !== payload.id)).toBeTruthy();
    // console.log(JSON.stringify(resp, null, 2));

    // grab product with id=1
    productId1 = resp.body.find((obj) => obj.id === 1)!;
    expect(productId1).toBeDefined();
  });

  test('Add new item', async ({ api }) => {
    const resp = await api.fakeStore.postProduct(payload);
    expect(resp.body).toMatchObject(payload);
    // console.log(JSON.stringify(resp, null, 4));
  });

  test.skip('Negative cas: failed on missing field', async ({ api }) => {
    // skipping since fake store doesn't support this
    const brokenPayload = {
      id: 21,
      price: 100,
      description: 'Desc',
      category: 'PW',
      image: 'http://example.com',
    } as ProductNegative;

    const resp = await api.fakeStore.postProduct(brokenPayload, 400);
    expect(resp.body).toMatchObject(brokenPayload);
  });

  test('Added item is returned in the list', async ({ api }) => {
    // This is a case for real API
    // const resp = await api.fakeStore.getProductById(payload.id.toString(), 200);
    const resp = await api.fakeStore.getProductById('1', 200);
    expect(resp.body).toMatchObject(productId1);
  });

  test('Can sort in descending all items and limit', async ({ api }) => {
    const resp = await api.fakeStore.getProducts({ sort: 'desc', limit: 2 });

    // Extract the IDs from the response
    const ids = resp.body.map((product) => product.id);

    await test.step('can limit by 2', ({}) => {
      expect(ids).toHaveLength(2);
    });

    await test.step('Can sort in descending order', ({}) => {
      // Create a copy and sort it locally in descending order
      const expectedIds = [...ids].sort((a, b) => b - a);

      // Verify the API response matches the expected sort
      expect(ids).toEqual(expectedIds);
    });
  });
});
