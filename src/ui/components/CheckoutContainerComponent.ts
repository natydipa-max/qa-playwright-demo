import { Locator, expect } from "@playwright/test";
import { CheckoutItemComponent } from "./CheckoutItemComponent";
import { BaseContainerComponent } from "./baseComponent/BaseContainerComponent";

export class CheckoutContainerComponent extends BaseContainerComponent {

  protected createItem(locator: Locator): CheckoutItemComponent {
    return new CheckoutItemComponent(locator);
  }

  getItem(name: string): CheckoutItemComponent {
    return new CheckoutItemComponent(
      this.cartItems.filter({ hasText: name })
    );
  }

  async getAllItems(): Promise<CheckoutItemComponent[]> {
    const items = await this.cartItems.all();
    return items.map((item) => new CheckoutItemComponent(item));
  }

  async getAllNames(): Promise<string[]> {
    const items = await this.getAllItems();
    return Promise.all(items.map((item) => item.getName()));
  }

  async getAllPrices(): Promise<number[]> {
    const items = await this.getAllItems();
    return Promise.all(items.map((item) => item.getPrice()));
  }

  // Asserts
  async assertItemsCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async assertItemPresent(itemName: string): Promise<void> {
    await expect(
      this.getItem(itemName).root
    ).toBeVisible();
  }

  async assertItemNoPresent(itemName: string): Promise<void> {
    await expect(
      this.getItem(itemName).root
    ).toBeHidden();
  }
}
