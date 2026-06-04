import { Locator, expect } from "@playwright/test";
import { InventoryCardComponent } from "./InventoryCardComponent";

export class InventoryContainerComponent {
  readonly root: Locator;
  readonly cards: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.cards = root.locator('[data-test="inventory-item"]');
  }

  async waitForComponentLoaded() {
    await expect(this.root).toBeVisible();
    const firstCard =
    new InventoryCardComponent(this.cards.first());

    await firstCard.waitForComponentLoaded();
  }

  getCard(name: string): InventoryCardComponent {
    return new InventoryCardComponent(
      this.cards.filter({ hasText: name })
    );
  }

  async getAllCards(): Promise<InventoryCardComponent[]> {
  const items = await this.cards.all();

  return items.map(
    (item) => new InventoryCardComponent(item)
  );
}

  async getAllNames(): Promise<string[]> {
  const count = await this.cards.count();

  const names: string[] = [];

  for (let i = 0; i < count; i++) {
    const card = new InventoryCardComponent(this.cards.nth(i));
    names.push(await card.getName());
  }

  return names;
}

  async getAllPrices(): Promise<number[]> {
  const count = await this.cards.count();

  const prices: number[] = [];

  for (let i = 0; i < count; i++) {
    const card = new InventoryCardComponent(this.cards.nth(i));
    prices.push(await card.getPrice());
  }

  return prices;
}


  async assertItemsCount(expectedCount: number) {
    await expect(this.cards).toHaveCount(expectedCount);
  }
}
