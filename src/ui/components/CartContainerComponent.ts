import { expect, Locator } from "@playwright/test";
import { CartItemComponent } from "./CartItemComponent";
import { BaseContainerComponent } from "./baseComponent/BaseContainerComponent";

export class CartContainerComponent extends BaseContainerComponent {
    protected createItem(locator: Locator): CartItemComponent 
    {
        return new CartItemComponent(locator);
    }
    
    // Getters
    getItem(itemName: string): CartItemComponent {
        return new CartItemComponent(
              this.cartItems.filter({ hasText: itemName })
            );
    }

    async getAllItems(): Promise<CartItemComponent[]> {
        const items = await this.cartItems.all();

        return items.map(
            (item) => new CartItemComponent(item)
        );      
    }   

    // Assertions
    async waitForComponentLoaded(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async waitForItemsLoaded(): Promise<void> {
        const firstItem = new CartItemComponent(
        this.cartItems.first()
            );

        await firstItem.waitForComponentLoaded();
    }

    async assertItemPresent(itemName: string): Promise<void> {
        const item = this.cartItems.filter({ hasText: itemName });
        await expect(item).toHaveCount(1);
    }

    async assertItemNotPresent(itemName: string): Promise<void> {
        const item = this.cartItems.filter({ hasText: itemName });
        await expect(item).toHaveCount(0);
    }
    async assertItemsCount(expected: number): Promise<void> {
        await expect(this.cartItems)
            .toHaveCount(expected);
    }

}