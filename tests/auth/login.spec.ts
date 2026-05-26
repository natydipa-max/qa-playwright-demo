import { test, expect } from '@playwright/test';

import { LoginPage } from '@pages/LoginPage';
import { USERS } from '../../src/core/fixtures/users';
import { ROUTES } from '../../src/core/constants/routes';
import { ERROR_MESSAGES } from '../../src/core/constants/errors';

test.describe('Login', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();

        loginPage = new LoginPage(page);

        await loginPage.goto();
    });

  test('successful login', async ({ page }) => {
    
    await loginPage.assertLoginButtonEnabled();
    await Promise.all([
    page.waitForURL(new RegExp(ROUTES.INVENTORY)),
        loginPage.login(
        USERS.STANDARD.username,
        USERS.STANDARD.password
    )
    ]);
    await expect(page)
        .toHaveURL(new RegExp(ROUTES.INVENTORY));
  });

  test('locked user cannot login', async ({ page }) => {

    await loginPage.login(
        USERS.LOCKED.username,
        USERS.LOCKED.password
    );

    await loginPage.assertLoginError(ERROR_MESSAGES.LOCKED_USER);
  });

  test('should display error for invalid credentials', async ({ page }) => {
    
    await loginPage.login(
      USERS.INVALID.username,
      USERS.INVALID.password
    );

    await loginPage.assertLoginError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test('should display error for required username', async ({ page }) => {
    
    await loginPage.login(
      '',
      ''
    );

    await loginPage.assertLoginError(ERROR_MESSAGES.REQUIRED_USERNAME);
  });

  test('should display error for required password', async ({ page }) => {
    
    await loginPage.login(
      USERS.STANDARD.username,
      ''
    );

    await loginPage.assertLoginError(ERROR_MESSAGES.REQUIRED_PASSWORD);
  });
});