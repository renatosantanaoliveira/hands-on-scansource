import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CompraPage extends BasePage {
  readonly addToCartButtons: Locator;
  private readonly cartLink: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButtons = this.page.locator('a.productcart');
    this.cartLink = this.page.locator('.main_menu').getByText('Cart');
    this.checkoutBtn = this.page.locator('#cart_checkout1, #cart_checkout2, #checkout_btn');
  }

  async addProductsToCart(quantidade: number): Promise<void> {
    for (let i = 0; i < quantidade; i++) {
      const btn = this.addToCartButtons.nth(i);
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async goToCart(): Promise<void> {
    await this.cartLink.first().click();
    await this.page.waitForURL(/checkout\/cart/);
  }

  async getCartProductCount(): Promise<number> {
    await this.page.waitForSelector('.cart-info');
    return await this.page.locator('.cart-info td.align_left > a').count();
  }

  async getCartProducts(): Promise<string[]> {
    return await this.page.locator('.cart-info td.align_left > a').allTextContents();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutBtn.first().scrollIntoViewIfNeeded();
    await this.checkoutBtn.first().click();
  }

  async isCheckoutPage(): Promise<boolean> {
    await this.page.waitForLoadState('load');
    const url = this.page.url();
    return url.includes('checkout') && !url.includes('cart');
  }
}
