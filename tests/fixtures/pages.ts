import { test as base } from '@playwright/test';

import { InventoryPage } from '@pages/InventoryPage';
import { ItemDetailsPage } from '@pages/ItemDetailsPage';

type Pages = {
  inventoryPage: InventoryPage;
  itemDetailsPage: ItemDetailsPage;
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
});

export { expect } from '@playwright/test';