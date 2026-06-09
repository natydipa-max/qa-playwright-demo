import { expect, Locator } from "@playwright/test";
import { BaseItemComponent } from "./baseComponent/BaseItemComponent";

export class CartItemComponent extends BaseItemComponent {
    
    readonly removeButton: Locator;
    readonly quantity: Locator;

    constructor(root: Locator) {
        super(root);
        this.quantity = root.locator('[data-test="item-quantity"]');

        this.removeButton = root.locator('[data-test^="remove-"]');
    }


    // Getters
    async getQuantity(): Promise<number> {
        const quantityText = await this.quantity.textContent();
        return parseInt(quantityText || "0", 10);
    }

    // Actions
    async removeFromCart(): Promise<void> {
         await this.removeButton.click();
         }

    // Assertions
    async waitForComponentLoaded(): Promise<void> {
        await this.waitForBaseFieldsLoaded();
        
        await expect(this.quantity).toBeVisible();
        await expect(this.removeButton).toBeVisible();
        await expect(this.itemDescription).toBeVisible();
    }
    }