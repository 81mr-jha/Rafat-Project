import { Page, Locator, expect } from '@playwright/test';
import BasePage from './basePage';

export default class HotelPage extends BasePage {
  readonly reserveButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.reserveButton = page.getByRole('button', { name: 'Rezervovat' });
    this.firstNameInput = page.locator('input#customer\\.firstName');
    this.lastNameInput = page.locator('input#customer\\.lastName');
    this.phoneInput = page.locator('input#customer\\.phone');
    this.emailInput = page.locator('input#customer\\.email');
  }

  async reserveHotel() {
    await this.reserveButton.click();
    await expect(this.firstNameInput).toBeEditable();
  }

  async fillCustomerInfo(customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.phoneInput.fill(customer.phone);
    await this.emailInput.fill(customer.email);
    await expect(this.emailInput).toHaveValue(customer.email);
  }
}