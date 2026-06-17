import { type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly url = "/";

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto(this.url);
  }
}
