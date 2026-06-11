import { test, expect } from "tests/fixtures/pages";
import { prepareCheckoutStepTwo } from "tests/checkout/helpers/checkoutSetup";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Step Two Visual Tests", () => {

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

    test('checkout step two page visual snapshot @visual', async ({
    checkoutStepTwoPage,
    page,
        }) => {
        await checkoutStepTwoPage.open();
        await checkoutStepTwoPage.waitForPageLoaded();

        await expect(page).toHaveScreenshot(
            "checkout-step-two-page.png",
            { 
                fullPage: true,
                animations: "disabled",
            }
        );
    });

});