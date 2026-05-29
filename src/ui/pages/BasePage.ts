import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Each page must define its own load validation
   */
  abstract waitForPageLoaded(): Promise<void>;

  /**
   * Reusable visibility validation
   */
  async assertElementsVisible(elements: Locator[]) {
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  async goto(route: string) {
    await this.page.goto(route);
  }
}
