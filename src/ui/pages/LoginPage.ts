import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage/BasePage";
import { ROUTES } from "@constants/routes";
import { UI_TEXT } from "@constants/ui";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    super(page);

    this.appLogo = page.locator(".login_logo");
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Actions
  async open(): Promise<void> {
    
    await super.goto(ROUTES.LOGIN);

    await this.waitForPageLoaded();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.passwordInput.fill(password);
    await this.clickLoginButton();
  }

  async fillCredentials(username: string, password: string): Promise<void>  {
    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  // Assertions
  async assertLoginButtonEnabled(): Promise<void> {
    await expect(this.loginButton).toBeEnabled();
  }

  async assertLoginErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  async assertLoginError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async waitForPageLoaded(): Promise<void>  {
    await expect(this.appLogo).toHaveText(UI_TEXT.APP_TITLE);

    await this.assertElementsVisible([
      this.appLogo,
      this.usernameInput,
      this.passwordInput,
      this.loginButton,
    ]);
  }
}
