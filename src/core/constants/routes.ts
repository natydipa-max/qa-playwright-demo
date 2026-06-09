export const ROUTES = {
  LOGIN: "/",
  INVENTORY: "/inventory.html",
  CART: "/cart.html",
  INVENTORY_ITEM: "/inventory-item.html",

  inventoryItem: (id: number) =>
    `/inventory-item.html?id=${id}`,

  CHECKOUT_STEP_ONE: "/checkout-step-one.html",
  CHECKOUT_STEP_TWO: "/checkout-step-two.html",
  CHECKOUT_COMPLETE: "/checkout-complete.html",
};
