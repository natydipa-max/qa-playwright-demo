import { test as base } from '@playwright/test';

import { InventoryPage } from '@pages/InventoryPage';
import { ItemDetailsPage } from '@pages/ItemDetailsPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutStepOnePage } from '@pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '@pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '@pages/CheckoutCompletePage';

type Pages = {
  inventoryPage: InventoryPage;
  itemDetailsPage: ItemDetailsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<Pages>({
  inventoryPage: async ({ page }, use) => {

    const inventoryPage =
      new InventoryPage(page);

    await use(inventoryPage);
  },

  itemDetailsPage: async ({ page }, use) => {
    const itemDetailsPage =
      new ItemDetailsPage(page);

    await use(itemDetailsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompetePage = new CheckoutCompletePage(page);
    await use(checkoutCompetePage);
  },

});

export { expect } from '@playwright/test';