import { test, expect } from "tests/fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Step One Visual Tests", () => {

    test('checkout step one page visual snapshot @visual', async ({
    checkoutStepOnePage,
    page,
        }) => {
        await checkoutStepOnePage.open();
        await checkoutStepOnePage.waitForPageLoaded();

        await expect(page).toHaveScreenshot(
            "checkout-step-one-page.png",
            { 
                fullPage: true,
                animations: "disabled",
            }
        );
    });

});