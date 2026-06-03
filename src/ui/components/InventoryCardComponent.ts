import { expect, Locator } from "@playwright/test";

export class InventoryCardComponent {
  readonly root: Locator;

  readonly cardName: Locator;
  readonly cardPrice: Locator;
  readonly cardDescription: Locator;
  readonly cardImage: Locator;

  readonly addButton: Locator;
  readonly removeButton: Locator;





  constructor(root: Locator) {
    this.root = root;

    this.cardName = root.locator('[data-test="inventory-item-name"]');
    this.cardPrice = root.locator('[data-test="inventory-item-price"]');
    this.cardDescription = root.locator(
      '[data-test="inventory-item-description"]',
    );
    this.cardImage = root.locator("img.inventory_item_img");

    this.addButton = root.locator('button:has-text("Add to cart")');
    this.removeButton = root.locator('button:has-text("Remove")');
  }

  // Getters
  async getName() {
    return (await this.cardName.textContent()) || "";
  }

  async getPrice() {
    const priceText = await this.cardPrice.textContent();

    return parseFloat(priceText?.replace("$", "") || "0");
  }

  // Actions
  async addToCart() {
    await this.addButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  //Assertions
  async expectAddedToCart() {
    await expect(this.removeButton).toBeVisible();
  }

  async expectRemovedFromCart() {
    await expect(this.addButton).toBeVisible();
  }

  async openDetailsFromName() {
        await this.cardName.click();
        }

    async openDetailsFromImage() {
        await this.cardImage.click();
        }

  async waitForComponentLoaded() {
    await expect(this.cardName).toBeVisible();
    await expect(this.cardPrice).toBeVisible();
    await expect(this.root.locator("button")).toBeVisible();
    await expect(this.cardDescription).toBeVisible();
    await expect(this.cardImage).toBeVisible();
    await expect(this.cardImage).toHaveAttribute("src", /.+\.jpg/);
  }
}
