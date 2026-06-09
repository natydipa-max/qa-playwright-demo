import { BaseAuthenticatedPage } from "./basePage/BaseAuthenticatedPage";
import { expect, Locator, Page } from "@playwright/test";
import { ROUTES } from "@constants/routes";
import { UI_TEXT } from "@constants/ui";

export class CheckoutCompletePage extends BaseAuthenticatedPage {
    readonly title: Locator;

    readonly pony_express: Locator;

    readonly complete_header: Locator;

    readonly complete_text: Locator;

    readonly back_home_button: Locator;

    constructor(page: Page) {
        super(page);

        this.title = page.locator('[data-test="title"]');

        this.pony_express = page.locator('[data-test="pony-express"]');

        this.complete_header = page.locator('[data-test="complete-header"]');

        this.complete_text = page.locator('[data-test="complete-text"]');

        this.back_home_button = page.locator('[data-test="back-to-products"]');
    }

    // Actions
    async clickBackHome(): Promise<void> {
        this.back_home_button.click();
    }
    
    async open() {
        await super.goto(ROUTES.CHECKOUT_COMPLETE);

        await this.waitForPageLoaded();
    }

    // Asserts
    async waitForPageLoaded(): Promise<void> {
        await this.waitForAuthenticatedPageLoaded();
        await expect(this.title).toHaveText(UI_TEXT.CHECKOUT_COMPLETE_TITLE);
        await expect(this.complete_header).toHaveText(UI_TEXT.CHECKOUT_COMPLETE_HEADER);
        await expect(this.complete_text).toHaveText(UI_TEXT.CHECKOUT_COMPLETE_TEXT);
        await this.assertElementsVisible([
            this.title,
            this.pony_express, 
            this.complete_header,
            this.complete_text,
            this.back_home_button,
        ])
        await expect(this.back_home_button).toBeEnabled();
    }
}
