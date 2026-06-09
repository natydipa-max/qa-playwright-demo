import { test } from "tests/fixtures/pages";

test.use({
    storageState: "playwright/.auth/standard-user.json",
});

test.describe("Checkout Step One", 
    {
    tag: ['@checkout']
    },
    () => {

    test.beforeEach(async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.open();
    
    });

    // Test cases for Checkout Step One
    test('checkout step one page loads successfully', {
    tag: ['@smoke']
    }, async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.waitForPageLoaded();
    });

    test('user can fill checkout information and proceed to next step', {
    tag: ['@smoke']
    },async ({ checkoutStepOnePage, checkoutStepTwoPage }) => {
        await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "12345");
        await checkoutStepOnePage.clickContinue();

        await checkoutStepTwoPage.waitForPageLoaded();
    });

    test('user can cancel checkout and return to cart', async ({ checkoutStepOnePage, cartPage }) => {
        await checkoutStepOnePage.clickCancel();

        await cartPage.waitForPageLoaded();
    });

    test('user sees error message when trying to continue with empty fields', async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.clickContinue();

        await checkoutStepOnePage.assertErrorMessage("Error: First Name is required");
    });
    
    test('user sees error message when trying to continue when last name is empty', async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.fillCheckoutInformation("John", "", "");
        await checkoutStepOnePage.clickContinue();
        await checkoutStepOnePage.assertErrorMessage("Error: Last Name is required");
    });

    test('user sees error message when trying to continue when postal code is missing', async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "");
        await checkoutStepOnePage.clickContinue();
        await checkoutStepOnePage.assertErrorMessage("Error: Postal Code is required");
    });

    test('user can clear error after entering valid data', async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.clickContinue();
        await checkoutStepOnePage.assertErrorMessage("Error: First Name is required");

        await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "12345");
        await checkoutStepOnePage.clickContinue();
        await checkoutStepOnePage.assertNoErrorMessage();
    });

    test('user can fill checkout information and see no error message', async ({ checkoutStepOnePage }) => {
        await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "12345");
        await checkoutStepOnePage.clickContinue();
        await checkoutStepOnePage.assertNoErrorMessage();
    });

});