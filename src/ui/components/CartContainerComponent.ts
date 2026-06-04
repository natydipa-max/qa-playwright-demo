import { expect, Locator } from "@playwright/test";
import { CartItemComponent } from "./CartItemComponent";

export class CartContainerComponent {
    readonly root: Locator;
    readonly cartItems: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.cartItems = root.locator('[data-test="inventory-item"]');
    }

    async waitForComponentLoaded() {
        await expect(this.root).toBeVisible();
    }

    async waitForItemsLoaded() {
        const firstItem = new CartItemComponent(
        this.cartItems.first()
            );

        await firstItem.waitForComponentLoaded();
    }

    getItem(itemName: string): CartItemComponent {
        return new CartItemComponent(
              this.cartItems.filter({ hasText: itemName })
            );
    }

    async getAllItems() {
        const items = await this.cartItems.all();

        return items.map(
            (item) => new CartItemComponent(item)
        );      
    }   

    // Assertions

    async expectItemPresent(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        await expect(item).toHaveCount(1);
    }

    async expectItemNotPresent(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        await expect(item).toHaveCount(0);
    }
    async assertItemsCount(expected: number) {
        await expect(this.cartItems)
            .toHaveCount(expected);
    }

}