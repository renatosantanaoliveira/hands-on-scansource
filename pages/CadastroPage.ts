import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface RegistroCliente {
  clienteId: number;
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
  cidade: string;
  estado: string;
  cep: string;
}

export class CadastroPage extends BasePage {
  private readonly registerRadio: Locator;
  private readonly continueChoiceButton: Locator;
  private readonly firstnameInput: Locator;
  private readonly lastnameInput: Locator;
  private readonly emailInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateSelect: Locator;
  private readonly zipCodeInput: Locator;
  private readonly newsletterRadio: Locator;
  private readonly agreeCheckbox: Locator;
  private readonly continueFormButton: Locator;
  readonly successMessage: Locator;

  private readonly addressInput: Locator;
  private readonly loginnameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.registerRadio = this.page.locator('#accountFrm_accountregister');
    this.continueChoiceButton = this.page.getByRole('button', { name: 'Continue' }).first();
    this.firstnameInput = this.page.locator('#AccountFrm_firstname');
    this.lastnameInput = this.page.locator('#AccountFrm_lastname');
    this.emailInput = this.page.locator('#AccountFrm_email');
    this.cityInput = this.page.locator('#AccountFrm_city');
    this.stateSelect = this.page.locator('#AccountFrm_zone_id');
    this.zipCodeInput = this.page.locator('#AccountFrm_postcode');
    this.newsletterRadio = this.page.locator('#AccountFrm_newsletter0');
    this.agreeCheckbox = this.page.locator('#AccountFrm_agree');
    this.continueFormButton = this.page.getByRole('button', { name: 'Continue' }).last();

    this.addressInput = this.page.locator('#AccountFrm_address_1');
    this.loginnameInput = this.page.locator('#AccountFrm_loginname');
    this.passwordInput = this.page.locator('#AccountFrm_password');
    this.confirmPasswordInput = this.page.locator('#AccountFrm_confirm');

    this.successMessage = this.page.locator('.maintext');
  }

  async selectRegister(): Promise<void> {
    await this.registerRadio.check();
  }

  async continueToForm(): Promise<void> {
    await this.continueChoiceButton.click();
  }

  async fillRegistrationForm(cliente: RegistroCliente): Promise<void> {
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    const uniqueEmail = `test${uniqueId}${cliente.email}`;
    const uniqueLogin = `user${uniqueId}`;

    await this.firstnameInput.fill(cliente.nome);
    await this.lastnameInput.fill(cliente.sobrenome);
    await this.emailInput.fill(uniqueEmail);
    await this.addressInput.fill('Test Address 123');
    await this.cityInput.fill(cliente.cidade);
    
    await this.stateSelect.selectOption({ label: cliente.estado });
    await this.zipCodeInput.fill(cliente.cep);
    await this.loginnameInput.fill(uniqueLogin);
    await this.passwordInput.fill(cliente.password);
    await this.confirmPasswordInput.fill(cliente.password);
  }

  async uncheckNewsletter(): Promise<void> {
    await this.newsletterRadio.check();
  }

  async checkAgreeTerms(): Promise<void> {
    await this.agreeCheckbox.check();
  }

  async submitForm(): Promise<void> {
    await this.continueFormButton.click();
  }

}
