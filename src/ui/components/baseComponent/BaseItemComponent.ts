import { expect, Locator } from "@playwright/test";

export abstract class BaseItemComponent {
  readonly root: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.itemName = root.locator('[data-test="inventory-item-name"]');
    this.itemDescription = root.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = root.locator('[data-test="inventory-item-price"]');
  }

  protected async waitForBaseFieldsLoaded(): Promise<void> {
    await expect(this.itemName).toBeVisible();
    await expect(this.itemDescription).toBeVisible();
    await expect(this.itemPrice).toBeVisible();
  }

  abstract waitForComponentLoaded(): Promise<void>;

  async getName(): Promise<string> {
    return (await this.itemName.textContent()) || "";
  }

  async getPrice(): Promise<number> {
    const priceText = await this.itemPrice.textContent();

    return parseFloat(priceText?.replace("$", "") || "0");
  }

  async getDescription(): Promise<string> {
    return (await this.itemDescription.textContent()) || "";
  }

  // Asserts
  async assertName(expected: string): Promise<void> {
    await expect(this.itemName).toHaveText(expected);
  }

  async assertPrice(expected: number): Promise<void> {
    expect(await this.getPrice()).toBe(expected);
  }
}