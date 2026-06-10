import { test, expect } from "tests/fixtures/pages";

test.use({
  storageState: "playwright/.auth/standard-user.json",
});

test.describe("Inventory Visual Tests", () => {

  test("inventory page visual snapshot", async ({
    inventoryPage,
    page,
  }) => {

    await inventoryPage.open();
    await inventoryPage.waitForPageLoaded();

    await expect(page).toHaveScreenshot(
      "inventory-page.png",
      {
        fullPage: true,
      }
    );
  });

});