import { loginAsStandardUser } from "@helpers/auth";
import { InventoryPage } from "@pages/InventoryPage";
import { test, expect } from "@playwright/test";

test.describe("Inventory Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("inventory page should load successfully", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

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

  test("user can add product to cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await backpackItem.assertAddedToCart();

    await inventoryPage.header.assertCartBadgeCount(1);
  });

  test("user can remove product from cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");

    await backpackItem.addToCart();

    await backpackItem.removeFromCart();

    await backpackItem.assertRemovedFromCart();

    await inventoryPage.header.assertCartBadgeHidden();
  });

  test("products should be sorted alphabetically Z-A", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts("za");

    const productNames = await inventoryPage.inventoryContainer.getItemNames();

    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));

    expect(productNames).toEqual(sortedNames);
  });

  test("user can sort products by price low to high", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts("lohi");

    const prices = await inventoryPage.inventoryContainer.getItemPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test("user can add multiple products to cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

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

  test("user can remove one product from multiple selected items", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);

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
