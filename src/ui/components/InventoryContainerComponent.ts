import { Locator, expect } from "@playwright/test";
import { InventoryItemComponent } from "./InventoryItemComponent";

export class InventoryContainerComponent {
  readonly root: Locator;
  readonly inventoryItems: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.inventoryItems = root.locator('[data-test="inventory-item"]');
  }

  async waitForComponentLoaded() {
    await expect(this.root).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  getInventoryItem(name: string) {
    const item = this.inventoryItems.filter({
      hasText: name,
    });

    return new InventoryItemComponent(item);
  }
  async getItemNames() {
    const items = await this.inventoryItems.all();

    const names = [];

    for (const item of items) {
      const inventoryItem = new InventoryItemComponent(item);

      names.push(await inventoryItem.getName());
    }

    return names;
  }

  async getItemPrices() {
    const items = await this.inventoryItems.all();

    const prices = [];

    for (const item of items) {
      const inventoryItem = new InventoryItemComponent(item);

      prices.push(await inventoryItem.getPrice());
    }

    return prices;
  }

  async assertItemsCount(expectedCount: number) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }
}
