import { expect, Locator, Page } from "@playwright/test";

import { BaseAuthenticatedPage } from "./basePage/BaseAuthenticatedPage";

import { ROUTES } from "@constants/routes";

import { CheckoutContainerComponent } from "@components/CheckoutContainerComponent";
import { UI_TEXT } from "@constants/ui";

export class CheckoutStepTwoPage extends BaseAuthenticatedPage {
    readonly title: Locator;

    readonly checkoutContainer: CheckoutContainerComponent;

    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;

    readonly finishButton: Locator;

    readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page);

        this.title = page.locator('[data-test="title"]');

        this.checkoutContainer = new CheckoutContainerComponent(page.locator('[data-test="cart-list"]'));

        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');

        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }
    
    
    // Actions
    async open() {
        await super.goto(ROUTES.CHECKOUT_STEP_TWO);

        await this.waitForPageLoaded();
     }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }
    
    // Helpers
    async getSubtotal(): Promise<number> {
        const text = await this.subtotalLabel.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ""));
    }

    async getTax(): Promise<number> {
        const text = await this.taxLabel.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ""));
    }

    async getTotal(): Promise<number> {
        const text = await this.totalLabel.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ""));
    }

    async calculateExpectedSubtotal(): Promise<number> {
        const prices =
            await this.checkoutContainer.getAllPrices();

        return prices.reduce(
            (sum, price) => sum + price,
            0,
        );
        }

    //Assertions
    async waitForPageLoaded() {
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT_STEP_TWO);
        await this.waitForAuthenticatedPageLoaded();
        await expect(this.title).toHaveText(UI_TEXT.CHECKOUT_STEP_TWO_PAGE_TITLE);
        await this.assertElementsVisible([
            this.title,
            this.finishButton,
            this.cancelButton,
            this.subtotalLabel,
            this.taxLabel,
            this.totalLabel
        ]);
        await this.checkoutContainer.waitForComponentLoaded();
        }


  async assertTotalMatchesSummary(): Promise<void> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);
  }

  async assertSummaryTotalsVisible(): Promise<void> {
    await this.assertElementsVisible([
        this.subtotalLabel,
        this.taxLabel,
        this.totalLabel,
    ]);
  }
    
  async assertSubtotalMatchesItems(): Promise<void> {
    const expectedSubtotal =
    await this.calculateExpectedSubtotal();

    const displayedSubtotal =
        await this.getSubtotal();

    expect(displayedSubtotal)
        .toBeCloseTo(expectedSubtotal, 2);
    }
}