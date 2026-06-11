import { expect, Locator } from "@playwright/test";
import { BaseItemComponent } from "./BaseItemComponent"

export abstract class BaseContainerComponent {
  readonly root: Locator;
  readonly items: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.items = root.locator('[data-test="inventory-item"]');
  }

  protected abstract createItem(locator: Locator): BaseItemComponent;

  async waitForComponentLoaded(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async waitForItemsLoaded(): Promise<void> {
    const firstItem = this.createItem(this.items.first());
    await firstItem.waitForComponentLoaded();
  }

  async getItemCount(): Promise<number> {
    return this.items.count();
  }
}