export const ROUTES = {
  LOGIN: "/",
  INVENTORY: "/inventory.html",
  CART: "/cart.html",
  INVENTORY_ITEM: "/inventory-item.html",

  inventoryItem: (id: number) =>
    `/inventory-item.html?id=${id}`,
};
