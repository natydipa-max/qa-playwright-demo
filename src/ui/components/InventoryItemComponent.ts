import { expect, Locator } from "@playwright/test";

export class InventoryItemComponent {
  readonly root: Locator;

  readonly itemName: Locator;

  readonly itemPrice: Locator;

  readonly addToCartButton: Locator;

  readonly removeButton: Locator;

  readonly itemDescription: Locator;

  readonly itemImage: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.itemName = root.locator('[data-test="inventory-item-name"]');

    this.itemPrice = root.locator('[data-test="inventory-item-price"]');

    this.addToCartButton = root.locator('button:has-text("Add to cart")');

    this.removeButton = root.locator('button:has-text("Remove")');

    this.itemDescription = root.locator(
      '[data-test="inventory-item-description"]',
    );

    this.itemImage = root.locator("img.inventory_item_img");
  }

  async getName() {
    return (await this.itemName.textContent()) || "";
  }

  async getDescription() {
    return (await this.itemDescription.textContent()) || "";
  }

  async getPrice() {
    const priceText = await this.itemPrice.textContent();

    return parseFloat(priceText?.replace("$", "") || "0");
  }

  async getImageSrc() {
    return await this.itemImage.getAttribute("src");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  async assertAddedToCart() {
    await expect(this.removeButton).toBeVisible();
  }

  async assertRemovedFromCart() {
    await expect(this.addToCartButton).toBeVisible();
  }

  async waitForComponentLoaded() {
    await expect(this.itemName).toBeVisible();

    await expect(this.itemPrice).toBeVisible();

    await expect(this.root.locator("button")).toBeVisible();

    await expect(this.itemDescription).toBeVisible();

    await expect(this.itemImage).toBeVisible();

    await expect(this.itemImage).toHaveAttribute("src", /.+\.jpg/);
  }
}
