import { InventoryPage } from "@pages/InventoryPage";
import { CartPage } from "@pages/CartPage";
import { CheckoutStepOnePage } from "@pages/CheckoutStepOnePage";

type CheckoutSetup = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
};

export async function prepareCheckoutStepTwo({
  inventoryPage,
  cartPage,
  checkoutStepOnePage,
}: CheckoutSetup) {
  await inventoryPage.open();

  await inventoryPage
    .inventoryContainer
    .getCard("Sauce Labs Backpack")
    .addToCart();

  await inventoryPage
    .inventoryContainer
    .getCard("Sauce Labs Bike Light")
    .addToCart();

  await inventoryPage.header.openCart();

  await cartPage.clickCheckout();

  await checkoutStepOnePage.fillCheckoutInformation(
    "John",
    "Doe",
    "12345"
  );

  await checkoutStepOnePage.clickContinue();
}