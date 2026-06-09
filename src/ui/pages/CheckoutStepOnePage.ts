import { expect, Locator, Page } from "@playwright/test";

import { BaseAuthenticatedPage } from "./basePage/BaseAuthenticatedPage";

import { ROUTES } from "@constants/routes";
import { UI_TEXT } from "@constants/ui";

export class CheckoutStepOnePage extends BaseAuthenticatedPage {
    readonly title: Locator;

    readonly firstNameInput: Locator;

    readonly lastNameInput: Locator;

    readonly postalCodeInput: Locator;

    readonly continueButton: Locator;

    readonly cancelButton: Locator;
    
    constructor(page: Page) {
        super(page);

        this.title = page.locator('[data-test="title"]');

        this.firstNameInput = page.locator('[data-test="firstName"]');

        this.lastNameInput = page.locator('[data-test="lastName"]');

        this.postalCodeInput = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');

        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    // Actions      
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    
    async clickContinue() {
        await this.continueButton.click();
    }

    async open() {
        await super.goto(ROUTES.CHECKOUT_STEP_ONE);

        await this.waitForPageLoaded();
    }

    async clickCancel() {
        await this.cancelButton.click();
    } 

    // Assertions
    async waitForPageLoaded() {
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT_STEP_ONE);
        await this.waitForAuthenticatedPageLoaded();
        await expect(this.title).toHaveText(UI_TEXT.CHECKOUT_STEP_ONE_PAGE_TITLE);
        await this.assertElementsVisible([
            this.title,
            this.firstNameInput,
            this.lastNameInput,
            this.postalCodeInput,
            this.continueButton,
        ]);
    }

    async assertErrorMessage(expectedMessage: string) {
        const errorMessage = this.page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(expectedMessage);
    }

    async assertNoErrorMessage() {
        const errorMessage = this.page.locator('[data-test="error"]');
        await expect(errorMessage).toBeHidden();
    }
}