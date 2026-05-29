import { Locator, Page, expect } from "@playwright/test";

export class SideMenuComponent {
  readonly page: Page;

  readonly allItemsLink: Locator;

  readonly aboutLink: Locator;

  readonly logoutLink: Locator;

  readonly resetAppStateLink: Locator;

  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');

    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');

    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');

    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');

    this.closeMenuButton = page.locator('[data-test="close-menu"]');
  }

  async waitForComponentLoaded() {
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.resetAppStateLink.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }
}
