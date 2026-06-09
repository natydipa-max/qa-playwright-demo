
import { expect, Locator } from "@playwright/test";
import { BaseItemComponent } from "./baseComponent/BaseItemComponent";


export class CheckoutItemComponent extends BaseItemComponent {
  readonly quantity: Locator;

  constructor(root: Locator) {
    super(root);
    this.quantity = root.locator('[data-test="item-quantity"]');
  }

  async getQuantity(): Promise<number> {
    const quantityText = await this.quantity.textContent();
        return parseInt(quantityText || "0", 10);
  }

  async waitForComponentLoaded(): Promise<void> {
      await this.waitForBaseFieldsLoaded();

      await expect(this.quantity).toBeVisible();
    }
}