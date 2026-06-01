import { InventoryPage } from "@pages/InventoryPage";
import { test, expect } from "../fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Inventory Page", () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('inventory page should load successfully', async ({ inventoryPage }) => {


    await inventoryPage.waitForPageLoaded();

    const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");
    await backpackItem.waitForComponentLoaded();

    //amount of products should be 6
    await inventoryPage.inventoryContainer.assertItemsCount(6);

    //product should be sorted by default from A-Z
    const productNames = await inventoryPage.getInventoryItemNames();

    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });

  test('user can add product to cart', async ({ inventoryPage }) => {

    const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await backpackItem.assertAddedToCart();

    await inventoryPage.header.assertCartBadgeCount(1);
  });

  test('user can remove product from cart', async ({ inventoryPage }) => {
    const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await backpackItem.removeFromCart();

    await backpackItem.assertRemovedFromCart();

    await inventoryPage.header.assertCartBadgeHidden();
  });

  test('products should be sorted alphabetically Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts("za");

    const productNames = await inventoryPage.inventoryContainer.getItemNames();

    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));

    expect(productNames).toEqual(sortedNames);
  });

  test('user can sort products by price low to high', async ({ inventoryPage }) => {

    await inventoryPage.sortProducts("lohi");

    const prices = await inventoryPage.inventoryContainer.getItemPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('user can add multiple products to cart', async ({ inventoryPage }) => {
    const backpackItem = inventoryPage.inventoryContainer.getInventoryItem(
      "Sauce Labs Backpack",
    );

    const bikeLightItem = inventoryPage.inventoryContainer.getInventoryItem(
      "Sauce Labs Bike Light",
    );

    await backpackItem.addToCart();

    await bikeLightItem.addToCart();

    await backpackItem.assertAddedToCart();

    await bikeLightItem.assertAddedToCart();

    await inventoryPage.header.assertCartBadgeCount(2);
  });

  test('user can remove one product from multiple selected items', async ({
    inventoryPage
  }) => {

    const backpackItem = inventoryPage.inventoryContainer.getInventoryItem(
      "Sauce Labs Backpack",
    );

    const bikeLightItem = inventoryPage.inventoryContainer.getInventoryItem(
      "Sauce Labs Bike Light",
    );

    await backpackItem.addToCart();

    await bikeLightItem.addToCart();

    await backpackItem.removeFromCart();

    await backpackItem.assertRemovedFromCart();

    await bikeLightItem.assertAddedToCart();

    await inventoryPage.header.assertCartBadgeCount(1);
  });
});
