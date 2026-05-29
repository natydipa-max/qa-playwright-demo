import { expect, test } from "@playwright/test";
import { InventoryPage } from "@pages/InventoryPage";
import { loginAsStandardUser } from "@helpers/auth";
import { ROUTES } from "@constants/routes";

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("user can logout successfully", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.waitForPageLoaded();
    await inventoryPage.header.openMenu();

    await inventoryPage.clickLogout();

    await expect(page).toHaveURL(new RegExp(ROUTES.LOGIN));
  });
});
