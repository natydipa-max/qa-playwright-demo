
import { test } from "tests/fixtures/pages";


test.use({
    storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Complete Page",{
    tag: ['@checkout']
    },
    () => {
  

  test.beforeEach(async ({
    checkoutCompletePage
  }) => {
    await checkoutCompletePage.open();
  });

  test('checkout complete page should load successfully', {
    tag: ['@smoke'],
  },
  async ({ checkoutCompletePage }) => {
    await checkoutCompletePage.waitForPageLoaded();
  });

  test('user can go back to home page', async ({ inventoryPage, checkoutCompletePage }) => {
    await checkoutCompletePage.clickBackHome();
    await inventoryPage.waitForPageLoaded();
  });

});