import { prepareCheckoutStepTwo } from "./helpers/checkoutSetup";
import { test, expect } from "tests/fixtures/pages";

test.use({
    storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Step Two Page",{
    tag: ['@checkout']
    },
    () => {
  

  test.beforeEach(async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    await prepareCheckoutStepTwo({
      inventoryPage,
      cartPage,
      checkoutStepOnePage,
    });
  });

  test('checkout step two page should load successfully', {
    tag: ['@smoke'],
  },
  async ({ checkoutStepTwoPage }) => {
    await checkoutStepTwoPage.waitForPageLoaded();
  });

  test('checkout overview displays all selected items', async ({ checkoutStepTwoPage }) => {
    await checkoutStepTwoPage.waitForPageLoaded();

    await checkoutStepTwoPage.checkoutContainer.assertItemPresent("Sauce Labs Backpack");

    await checkoutStepTwoPage.checkoutContainer.assertItemPresent("Sauce Labs Bike Light");

    await checkoutStepTwoPage.checkoutContainer.assertItemsCount(2);
  });

  test('checkout overview displays corrent item quantities', async ({ checkoutStepTwoPage }) => {
    
    const backpack =
    checkoutStepTwoPage.checkoutContainer.getItem(
      "Sauce Labs Backpack"
    );

    const bikeLight =
        checkoutStepTwoPage.checkoutContainer.getItem(
        "Sauce Labs Bike Light"
        );

    expect(await backpack.getQuantity()).toBe(1);
    expect(await bikeLight.getQuantity()).toBe(1);
  }); 

  test('checkout overview displays summary totals', async ({ checkoutStepTwoPage }) => {
    await checkoutStepTwoPage.assertSummaryTotalsVisible();
  });

  test('checkout overview can calculates total correctly', async ({ checkoutStepTwoPage }) => {
    const expectedSubtotal = 
    
       await checkoutStepTwoPage.assertSubtotalMatchesItems();
       await checkoutStepTwoPage.assertTotalMatchesSummary();
  });

  test('user can cancel checkout', async ({ inventoryPage, checkoutStepTwoPage }) => {
    await checkoutStepTwoPage.clickCancel();
    await inventoryPage.waitForPageLoaded();
  });

  test('user can finish checkout', async ({ checkoutStepTwoPage, checkoutCompletePage }) => {
    await checkoutStepTwoPage.clickFinish();
    await checkoutCompletePage.waitForPageLoaded();

  });

});