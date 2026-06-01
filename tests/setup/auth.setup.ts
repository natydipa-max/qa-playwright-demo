import { test as setup } from '@playwright/test';

import { loginAsStandardUser } from '@helpers/auth';

setup('authenticate as standard user', async ({ page }) => {

  await loginAsStandardUser(page);

  await page.context().storageState({
    path: 'playwright/.auth/standard-user.json',
  });
});