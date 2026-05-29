import { Page } from "@playwright/test";

import { LoginPage } from "@pages/LoginPage";
import { ROUTES } from "@constants/routes";
import { USERS } from "@fixtures/users";

export async function loginAsStandardUser(page: Page, waitForInventory = true) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  if (waitForInventory) {
    await Promise.all([
      page.waitForURL(new RegExp(ROUTES.INVENTORY)),
      loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password),
    ]);
  } else {
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  }
}
