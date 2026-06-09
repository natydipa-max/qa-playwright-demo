import { UI_TEXT } from "@constants/ui";
import { expect, Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly page: Page;

  readonly menuButton: Locator;

  readonly shoppingCartLink: Locator;

  readonly shoppingCartBadge: Locator;

  readonly appLogo: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuButton = page.getByRole("button", { name: "Open Menu" });

    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');

    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.appLogo = page.locator(".app_logo");
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
  }

  async assertCartBadgeHidden(): Promise<void> {
    await expect(this.shoppingCartBadge).toBeHidden();
  }

  async waitForComponentLoaded(): Promise<void> {
    await expect(this.menuButton).toBeVisible();

    await expect(this.shoppingCartLink).toBeVisible();

    await expect(this.appLogo).toHaveText(UI_TEXT.APP_TITLE);
  }
}
