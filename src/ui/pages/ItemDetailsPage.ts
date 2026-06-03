import { expect, Locator, Page } from "@playwright/test";

import { BaseAuthenticatedPage } from "./BaseAuthenticatedPage";
import { ROUTES } from "@constants/routes";

export class ItemDetailsPage extends BaseAuthenticatedPage {

  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemDescription: Locator;
  readonly itemImage: Locator;

  readonly addButton: Locator;
  readonly removeButton: Locator;

  readonly backToProductsButton: Locator;

  constructor(page: Page) {
        super(page);

        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemDescription = page.locator(
        '[data-test="inventory-item-desc"]'
        );
        this.itemImage = page.locator('.inventory_details_img');

        this.addButton = page.locator('button:has-text("Add to cart")');
        this.removeButton = page.locator('button:has-text("Remove")');

        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    }

    async waitForPageLoaded() {
        await expect(this.page).toHaveURL(new RegExp(`${ROUTES.INVENTORY_ITEM}\\?id=\\d+`));
        await this.waitForAuthenticatedPageLoaded();
        await expect(this.itemName).toBeVisible();
        await expect(this.itemPrice).toBeVisible();
        await expect(this.itemDescription).toBeVisible();
        await expect(this.itemImage).toBeVisible();
        await expect(this.backToProductsButton).toBeVisible();
        }


    // Getters
    async getItemName() {
        return (await this.itemName.textContent()) || "";
    }

    async getItemDescription() {
        return (await this.itemDescription.textContent()) || "";
    }
    
    async getItemPrice() {
        const priceText = await this.itemPrice.textContent();
        return parseFloat(priceText?.replace("$", "") || "0");
    }

    async getItemImageSrc() {
        return await this.itemImage.getAttribute("src");
    }

    //Actions
    async clickBackToProducts() {
        await this.backToProductsButton.click();
        }

    async addToCart() {
        await this.addButton.click();
        }

    async removeFromCart() {
        await this.removeButton.click();
        }

    async gotoItem(itemId: number) {
        await this.page.goto(
            `${ROUTES.INVENTORY_ITEM}?id=${itemId}`
        );
    }

    // Assertions
    async expectAddedToCart() {
        await expect(this.addButton).toBeHidden();
        await expect(this.removeButton).toBeVisible();
    }

    async expectRemovedFromCart() {
        await expect(this.addButton).toBeVisible();
        await expect(this.removeButton).toBeHidden();
    }
}