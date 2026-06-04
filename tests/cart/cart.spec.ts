import { test, expect } from "../fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Empty Cart", {
  tag: ['@cart']
  },
  () => {

  test.beforeEach(async ({ cartPage }) => {
    await cartPage.goto();
  });

  test('cart page should load successfully',{
      tag: ['@smoke'],
  },
   async ({ cartPage }) => {
    await cartPage.waitForPageLoaded();
    });
}
);

test.describe("Single Item Cart", {
  tag: ['@cart']
  },
  () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    const backpackItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Backpack");
    await backpackItem.addToCart();
    await inventoryPage.header.openCart();
  });

  test('cart should display added item', {
    tag: ['@smoke'],
    },
    async ({ cartPage }) => {
    await cartPage.waitForPageLoaded();
    await cartPage.cartContainer.waitForItemsLoaded();

    await cartPage.cartContainer.assertItemsCount(1);

    await cartPage.cartContainer.expectItemPresent("Sauce Labs Backpack");
  });

  test('user can remove product from cart', async ({ cartPage }) => {
    await cartPage.waitForPageLoaded();
    await cartPage.cartContainer.waitForItemsLoaded();

    await cartPage.cartContainer.getItem("Sauce Labs Backpack").removeFromCart();

    await cartPage.cartContainer.expectItemNotPresent("Sauce Labs Backpack");
  });

  test('user can navigate to item details from cart', async ({
    cartPage,
    itemDetailsPage,
  }) => {
    await cartPage.waitForPageLoaded();

    await cartPage.cartContainer.getItem("Sauce Labs Backpack").itemName.click();

    await itemDetailsPage.waitForPageLoaded();

    await expect(itemDetailsPage.itemName).toHaveText("Sauce Labs Backpack");   
  });

test.describe("Multiple Items Cart", {
  tag: ['@cart']
  },
  () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();

    const backpackItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Backpack");
    const bikeLightItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Bike Light");

    await backpackItem.addToCart();
    await bikeLightItem.addToCart();

    await inventoryPage.header.openCart();
  });

   test('cart should display all added items', {
    tag: ['@smoke'],
    },
    async ({ cartPage }) => {
    await cartPage.waitForPageLoaded();
    await cartPage.cartContainer.waitForItemsLoaded();

    await cartPage.cartContainer.assertItemsCount(2);

    await cartPage.cartContainer.expectItemPresent("Sauce Labs Backpack");
    await cartPage.cartContainer.expectItemPresent("Sauce Labs Bike Light");
  });

   test('removing one item preserves remaining items in cart', async ({ cartPage }) => {
    await cartPage.waitForPageLoaded();
    await cartPage.cartContainer.waitForItemsLoaded();

    await cartPage.cartContainer.getItem("Sauce Labs Backpack").removeFromCart();

    await cartPage.cartContainer.assertItemsCount(1);

    await cartPage.cartContainer.expectItemNotPresent("Sauce Labs Backpack");
    await cartPage.cartContainer.expectItemPresent("Sauce Labs Bike Light");
  });
});
});
