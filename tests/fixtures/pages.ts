import { test as base } from '@playwright/test';

import { InventoryPage } from '@pages/InventoryPage';
import { ItemDetailsPage } from '@pages/ItemDetailsPage';
import { CartPage } from '@pages/CartPage';

type Pages = {
  inventoryPage: InventoryPage;
  itemDetailsPage: ItemDetailsPage;
  cartPage: CartPage;
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
  }

});

export { expect } from '@playwright/test';