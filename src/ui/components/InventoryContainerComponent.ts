import { Locator, expect } from "@playwright/test";
import { InventoryCardComponent } from "./InventoryCardComponent";
import { BaseContainerComponent } from "./baseComponent/BaseContainerComponent";

export class InventoryContainerComponent extends BaseContainerComponent {

  protected createItem(locator: Locator): InventoryCardComponent {
    return new InventoryCardComponent(locator);
  }
  // Getters

  getCard(name: string): InventoryCardComponent {
    return new InventoryCardComponent(
      this.cartItems.filter({ hasText: name })
    );
  }

  async getAllCards(): Promise<InventoryCardComponent[]> {
  const items = await this.cartItems.all();

  return items.map(
    (item) => new InventoryCardComponent(item)
  );
}

  async getAllNames(): Promise<string[]> {
  const count = await this.cartItems.count();

  const names: string[] = [];

  for (let i = 0; i < count; i++) {
    const card = new InventoryCardComponent(this.cartItems.nth(i));
    names.push(await card.getName());
  }

  return names;
}

  async getAllPrices(): Promise<number[]> {
  const count = await this.cartItems.count();

  const prices: number[] = [];

  for (let i = 0; i < count; i++) {
    const card = new InventoryCardComponent(this.cartItems.nth(i));
    prices.push(await card.getPrice());
  }

  return prices;
}

//Assertions

  async assertItemsCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }
}
