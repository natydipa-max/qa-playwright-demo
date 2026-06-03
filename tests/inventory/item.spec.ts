import { test, expect } from "../fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Item Details Page", {
  tag: ['@item-details']
  },
  () => {

  test.beforeEach(async ({ itemDetailsPage }) => {
    await itemDetailsPage.gotoItem(4);
  });

test('item details page should load successfully', {
      tag: ['@smoke'],
  },
  async ({itemDetailsPage,}) => {

  await itemDetailsPage.waitForPageLoaded();
});

test('user can add item to cart from item details page', 
    async ({itemDetailsPage}) => {
    
    await itemDetailsPage.addToCart();
    await itemDetailsPage.expectAddedToCart();
});

test('user can remove item from cart from item details page', 
    async ({itemDetailsPage}) => {
    
    await itemDetailsPage.addToCart();
    await itemDetailsPage.removeFromCart();
    await itemDetailsPage.expectRemovedFromCart();
});

test('user can navigate back to inventory page',
    async ({itemDetailsPage, inventoryPage}) => {
    
    await itemDetailsPage.clickBackToProducts();
    await inventoryPage.waitForPageLoaded();
});



});
