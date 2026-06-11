import { test, expect } from "tests/fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Item Details Visual Tests", () => {

    test('item details page visual snapshot @visual', async ({
    itemDetailsPage,
    page,
        }) => {
        await itemDetailsPage.gotoItem(4);
        await itemDetailsPage.waitForPageLoaded();

        await expect(page).toHaveScreenshot(
            "item-details-page.png",
            { 
                animations: "disabled",
            }
        );
    });

});