import { test as base } from '@playwright/test';

import { InventoryPage } from '@pages/InventoryPage';

type Pages = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<Pages>({
  inventoryPage: async ({ page }, use) => {

    const inventoryPage =
      new InventoryPage(page);

    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';