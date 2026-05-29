import { Page } from "@playwright/test";

import { BasePage } from "./BasePage";

import { HeaderComponent } from "@components/HeaderComponent";

import { SideMenuComponent } from "@components/SideMenuComponent";

export abstract class BaseAuthenticatedPage extends BasePage {
  readonly header: HeaderComponent;

  readonly sideMenu: SideMenuComponent;

  constructor(page: Page) {
    super(page);

    this.header = new HeaderComponent(page);

    this.sideMenu = new SideMenuComponent(page);
  }

  async clickLogout() {
    await this.sideMenu.logout();
  }
}
