import { BaseAuthenticatedPage } from "./basePage/BaseAuthenticatedPage";

import { ROUTES } from "@constants/routes";

import { expect, Locator, Page } from "@playwright/test";

import { CartContainerComponent } from "@components/CartContainerComponent";

export class CartPage extends BaseAuthenticatedPage {
    readonly title: Locator;

    readonly cartContainer: CartContainerComponent;

    readonly continueShoppingButton: Locator;

    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.title = page.locator('[data-test="title"]');

        this.cartContainer = new CartContainerComponent(page.locator('[data-test="cart-list"]'));

        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');

        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    
    // Actions
    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();  
    }

    async open(): Promise<void> {
        await super.goto(ROUTES.CART);
    }

    // Assertions
    async waitForPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(ROUTES.CART);
        await this.waitForAuthenticatedPageLoaded();
        await this.cartContainer.waitForComponentLoaded();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
    }

}
