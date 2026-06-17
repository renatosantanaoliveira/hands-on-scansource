import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import { RegistroCliente } from '../pages/CadastroPage';
import cadastroMassa from '../data/cadastro-massa.json';

Given('que realizo cadastro com o cliente {int}', async function (this: PlaywrightWorld, clienteId: number) {
  const cliente = (cadastroMassa.clientes as RegistroCliente[]).find(c => c.clienteId === clienteId);
  if (!cliente) throw new Error(`Cliente com ID ${clienteId} não encontrado no JSON.`);

  await this.page.getByRole('link', { name: 'Login or register' }).click();
  await this.cadastroPage.selectRegister();
  await this.cadastroPage.continueToForm();
  const clienteUnico = { ...cliente, email: `test${Date.now()}@automation.com` };
  await this.cadastroPage.fillRegistrationForm(clienteUnico);
  await this.cadastroPage.uncheckNewsletter();
  await this.cadastroPage.checkAgreeTerms();
  await this.cadastroPage.submitForm();
  await this.page.waitForURL(/rt=account\/success/, { timeout: 55000, waitUntil: 'domcontentloaded' });
});

When('adiciono os 3 primeiros produtos da página', async function (this: PlaywrightWorld) {
  await this.homePage.goto();
  await this.compraPage.addProductsToCart(3);
});

When('acesso o carrinho para validar os produtos', async function (this: PlaywrightWorld) {
  await this.compraPage.goToCart();
});

Then('devo ver os 3 produtos adicionados no carrinho', async function (this: PlaywrightWorld) {
  const count = await this.compraPage.getCartProductCount();
  expect(count).toBe(3);
});

Then('clico em checkout para iniciar a finalização da compra', async function (this: PlaywrightWorld) {
  await this.compraPage.clickCheckout();
  expect(await this.compraPage.isCheckoutPage()).toBe(true);
  const screenshot = await this.page.screenshot({ fullPage: true });
  this.attach(screenshot, 'image/png');
});
