import { expect, Locator } from "@playwright/test";
import { BaseItemComponent } from "./baseComponent/BaseItemComponent";

export class InventoryCardComponent extends BaseItemComponent {
  readonly cardImage: Locator;

  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {

    super(root);
    this.cardImage = root.locator("img.inventory_item_img");

    this.addButton = root.locator('button:has-text("Add to cart")');
    this.removeButton = root.locator('button:has-text("Remove")');
  }

  // Getters
  

  // Actions
  async addToCart(): Promise<void> {
    await this.addButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async openDetailsFromName(): Promise<void> {
        await this.itemName.click();
        }

  async openDetailsFromImage(): Promise<void> {
        await this.cardImage.click();
        }

  //Assertions
  async isAddedToCart(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }

  async isRemovedFromCart(): Promise<void> {
    await expect(this.addButton).toBeVisible();
  }

  async waitForComponentLoaded(): Promise<void> {
    await this.waitForBaseFieldsLoaded();
    
    await expect(this.root.locator("button")).toBeVisible();
    await expect(this.cardImage).toBeVisible();
    await expect(this.cardImage).toHaveAttribute("src", /.+\.jpg/);
  }
}
