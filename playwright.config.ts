import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,

  retries: 1,

  reporter: [["html"], ["list"]],

  use: {
    baseURL: "https://www.saucedemo.com",

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    headless: true,
  },

  projects: [
    {
    name: "setup",
    testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/standard-user.json",
       },

       dependencies: ["setup"],
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //  name: 'webkit',
    //  use: { ...devices['Desktop Safari'] },
    //},
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
