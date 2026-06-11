import { test, expect } from "tests/fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Complete Visual Tests", () => {

test('checkout complete page visual snapshot @visual', async ({
  checkoutCompletePage,
  page,
    }) => {
    await checkoutCompletePage.open();
    await checkoutCompletePage.waitForPageLoaded();

    await expect(page).toHaveScreenshot(
        "checkout-complete-page.png",
        { 
            animations: "disabled",
        }
    );
});

});