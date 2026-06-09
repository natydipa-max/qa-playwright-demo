import { expect, Locator, Page } from "@playwright/test";

import { UI_TEXT } from "@constants/ui";

import { BaseAuthenticatedPage } from "./basePage/BaseAuthenticatedPage";

import { InventoryContainerComponent } from "@components/InventoryContainerComponent";

import { SortOption } from "src/types/SortOption";

import { ROUTES } from "@constants/routes";

export class InventoryPage extends BaseAuthenticatedPage {
  readonly inventoryContainer: InventoryContainerComponent;

  readonly productSortSelect: Locator;

  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.inventoryContainer = new InventoryContainerComponent(
      page.locator('[data-test="inventory-container"]'),
    );

    this.productSortSelect = page.locator(
      '[data-test="product-sort-container"]',
    );

    this.pageTitle = page.locator('[data-test="title"]');
  }

  // Actions
  async open(): Promise<void> {
    await super.goto(ROUTES.INVENTORY);

    await this.waitForPageLoaded();
  }
  
  async sortProducts(sortOption: SortOption): Promise<void> {
    await this.productSortSelect.selectOption(sortOption);
  }

  // Assertions
  async waitForPageLoaded(): Promise<void> {
    await this.waitForAuthenticatedPageLoaded();
    await this.inventoryContainer.waitForComponentLoaded();

    await expect(this.pageTitle).toHaveText(UI_TEXT.PRODUCTS_PAGE_TITLE);

    await this.assertElementsVisible([this.pageTitle, this.productSortSelect]);
  }

  

}
