import { expect, Locator } from "@playwright/test";

export class CartItemComponent {
    readonly root: Locator;

    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly removeButton: Locator;
    readonly quantity: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.itemName = root.locator('[data-test="inventory-item-name"]');
        this.itemDescription = root.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = root.locator('[data-test="inventory-item-price"]');
        this.quantity = root.locator('[data-test="item-quantity"]');

        this.removeButton = root.locator('[data-test^="remove-"]');
    }

    async waitForComponentLoaded() {
        await expect(this.itemName).toBeVisible();
        await expect(this.itemPrice).toBeVisible();
        await expect(this.quantity).toBeVisible();
        await expect(this.removeButton).toBeVisible();
        await expect(this.itemDescription).toBeVisible();
    }

    // Getters
    async getName() {
        return (await this.itemName.textContent()) || "";
    }

    async getPrice() {
        const priceText = await this.itemPrice.textContent();
        return parseFloat(priceText?.replace("$", "") || "0");
    }

    async getQuantity() {
        const quantityText = await this.quantity.textContent();
        return parseInt(quantityText || "0", 10);
    }

    // Actions
    async removeFromCart() {
         await this.removeButton.click();
         }

        }