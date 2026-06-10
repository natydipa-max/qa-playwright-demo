import { LoginPage } from "@pages/LoginPage";
import { test, expect } from "tests/fixtures/pages";

test.describe("Login Visual Tests", () => {

    test("login page visual snapshot", async ({
    page
    }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.waitForPageLoaded();

        await expect(page).toHaveScreenshot(
            "login-page.png",
            { fullPage: true }
        );
    });

});