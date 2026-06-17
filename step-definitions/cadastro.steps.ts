import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import { RegistroCliente } from '../pages/CadastroPage';
import cadastroMassa from '../data/cadastro-massa.json';

Given('que acesso a home page da loja', async function (this: PlaywrightWorld) {
  await this.homePage.goto();
});

When('clico em {string}', async function (this: PlaywrightWorld, linkText: string) {
  await this.page.getByRole('link', { name: linkText }).first().click();
});

When('seleciono para registro de um novo cliente', async function (this: PlaywrightWorld) {
  await this.cadastroPage.selectRegister();
  await this.cadastroPage.continueToForm();
});

When('preencho os dados obrigatórios do cliente {int}', async function (this: PlaywrightWorld, clienteId: number) {
  const cliente = (cadastroMassa.clientes as RegistroCliente[]).find((c) => c.clienteId === clienteId);
  if (!cliente) throw new Error(`Cliente com ID ${clienteId} não encontrado no JSON.`);
  
  // Torna o e-mail único para evitar falhas de "Email já cadastrado" na Pipeline
  const clienteUnico = { ...cliente, email: `test${Date.now()}@automation.com` };
  await this.cadastroPage.fillRegistrationForm(clienteUnico);
});

When('aceito os termos e condições', async function (this: PlaywrightWorld) {
  await this.cadastroPage.checkAgreeTerms();
  await this.cadastroPage.uncheckNewsletter();
});

When('submeto o formulário de cadastro', async function (this: PlaywrightWorld) {
  await this.cadastroPage.submitForm();
});

Then('o cadastro deve ser realizado com sucesso', async function (this: PlaywrightWorld) {
  await expect(this.cadastroPage.successMessage).toContainText(/Your Account Has Been Created!/i);
  const screenshot = await this.page.screenshot({ fullPage: true });
  this.attach(screenshot, 'image/png');
});
