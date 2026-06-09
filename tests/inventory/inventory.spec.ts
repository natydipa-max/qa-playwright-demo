import { test, expect } from "../fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Inventory Page", {
  tag: ['@inventory']
  },
  () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test('inventory page should load successfully',{
      tag: ['@smoke'],
  },
   async ({ inventoryPage }) => {

    await inventoryPage.waitForPageLoaded();

    // amount of products should be 6
    await inventoryPage.inventoryContainer.assertItemsCount(6);

    const names = await inventoryPage.inventoryContainer.getAllNames();

     // sanity check: no empty products
    expect(names.every(n => n.length > 0)).toBeTruthy();
  });

  test('inventory default sorting is alphabetical A-Z', async ({ inventoryPage }) => {

    await inventoryPage.waitForPageLoaded();

    const names = await inventoryPage.inventoryContainer.getAllNames();

    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sorted);
  });

  test('user can add product to cart', async ({ inventoryPage }) => {

    const backpackItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await inventoryPage.header.assertCartBadgeCount(1);

    await backpackItem.isAddedToCart();
  });

  test('user can remove product from cart', async ({ inventoryPage }) => {
    const backpackItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await backpackItem.removeFromCart();

    await backpackItem.isRemovedFromCart();

    await inventoryPage.header.assertCartBadgeHidden();
  });

  test('products should be sorted alphabetically Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts("za");

    const names = await inventoryPage.inventoryContainer.getAllNames();

    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sortedNames);
  });

  test('products can be sorted by price ascending', async ({ inventoryPage }) => {

    await inventoryPage.sortProducts("lohi");

    const prices = await inventoryPage.inventoryContainer.getAllPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('user can add multiple products to cart', async ({ inventoryPage }) => {
    const backpackItem = inventoryPage.inventoryContainer.getCard(
      "Sauce Labs Backpack",
    );

    const bikeLightItem = inventoryPage.inventoryContainer.getCard(
      "Sauce Labs Bike Light",
    );

    await backpackItem.addToCart();

    await bikeLightItem.addToCart();

    await inventoryPage.header.assertCartBadgeCount(2);

    await backpackItem.isAddedToCart();

    await bikeLightItem.isAddedToCart();
  });

  test('removing one item preserves remaining cart state', async ({
    inventoryPage
  }) => {

    const backpackItem = inventoryPage.inventoryContainer.getCard(
      "Sauce Labs Backpack",
    );

    const bikeLightItem = inventoryPage.inventoryContainer.getCard(
      "Sauce Labs Bike Light",
    );

    await backpackItem.addToCart();

    await bikeLightItem.addToCart();

    await backpackItem.removeFromCart();

    await inventoryPage.header.assertCartBadgeCount(1);


    await backpackItem.isRemovedFromCart();

    await bikeLightItem.isAddedToCart();
  });

  test('user can open item details from product name', async ({
  inventoryPage,
  itemDetailsPage,
  }) => {
    const backpack =
      inventoryPage.inventoryContainer.getCard('Sauce Labs Backpack');

    await backpack.openDetailsFromName();

    await itemDetailsPage.waitForPageLoaded();
  });

  test('user can open item details from product image', async ({
  inventoryPage,
  itemDetailsPage,
  }) => {
    const backpack =
      inventoryPage.inventoryContainer.getCard('Sauce Labs Backpack');

    await backpack.openDetailsFromImage();

    await itemDetailsPage.waitForPageLoaded();
  });
});
