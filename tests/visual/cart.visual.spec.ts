import { test, expect } from "tests/fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Cart Visual Tests", () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();

        const backpackItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Backpack");
        const bikeLightItem = inventoryPage.inventoryContainer.getCard("Sauce Labs Bike Light");

        await backpackItem.addToCart();
        await bikeLightItem.addToCart();

        await inventoryPage.header.openCart();
    });

    test('cart page visual snapshot @visual', async ({
        cartPage,
        page,
        }) => {
        await cartPage.open();
        await cartPage.waitForPageLoaded();

        await expect(page).toHaveScreenshot(
            "cart-page.png",
            { 
                fullPage: true,
                animations: "disabled",
             }
        );
    });

});