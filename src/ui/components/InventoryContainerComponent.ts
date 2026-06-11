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
      this.items.filter({ hasText: name })
    );
  }

  async getAllCards(): Promise<InventoryCardComponent[]> {
  const items = await this.items.all();

  return items.map(
    (item) => new InventoryCardComponent(item)
  );
}

  async getAllNames(): Promise<string[]> {
  const cards = await this.getAllCards();
  return Promise.all(cards.map(card => card.getName()));
  }

  async getAllPrices(): Promise<number[]> {
  const cards = await this.getAllCards();
  return Promise.all(cards.map(card => card.getPrice()));
  }

//Assertions

  async assertItemsCount(expectedCount: number): Promise<void> {
    await expect(this.items).toHaveCount(expectedCount);
  }
}
