import { Page, Locator, expect } from '@playwright/test';
import BasePage from './basePage';

export default class BookingPage extends BasePage {
  // Personal Information Section
  readonly titleDropdown: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phonePrefix: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly birthDateInput: Locator;
  readonly streetInput: Locator;
  readonly streetNumberInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly documentIssuer: Locator;
  
  // Passenger Section
  readonly passengerSelectTitle : Locator;
  readonly passengerTitleDropdown: Locator;
  readonly passengerFirstNameInput: Locator;
  readonly passengerLastNameInput: Locator;
  readonly passengerBirthDateInput: Locator;
  readonly passengerTitleOptions: Locator;
  
  // Special Requests
  readonly specialRequestsTextarea: Locator;
  readonly promoCodeCheckbox: Locator;
  
  // Room Details
  readonly roomType: Locator;
  readonly allInclusiveCheckbox: Locator;
  
  // Navigation
  readonly continueButton: Locator;
  readonly agreementsCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    
    // Personal Information
    this.passengerTitleDropdown = page.locator('[id="wrapper\\.passengers\\[0\\]\\.title"] span');
    this.firstNameInput = page.locator('input#customer\\.firstName');
    this.lastNameInput = page.locator('input#customer\\.lastName');
    this.phonePrefix = page.locator('text="+420"');
    this.phoneInput = page.locator('input#customer\\.phone');
    this.emailInput = page.locator('input#customer\\.email');
    this.birthDateInput = page.locator('input[name="customer.birthDate"]');
    this.streetInput = page.getByRole('textbox', { name: 'Ulice' });
    this.streetNumberInput = page.getByRole('textbox', { name: 'Číslo popisné' });
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zip"]');
    this.documentIssuer = page.locator('text="Česká republika"');

    // Passenger Information
    // this.passengerTitleDropdown = page.locator('[id="wrapper\\.passengers\\[0\\]\\.title"] span');
    this.passengerTitleDropdown = page.locator('[id^="wrapper\\.passengers\\[1\\]\\.title"]');
    this.passengerTitleOptions = page.getByRole('button', { name: /Pan|Paní/, exact: true });
    this.passengerFirstNameInput = page.locator('input#passengers\\[1\\]\\.firstName');
    this.passengerLastNameInput = page.locator('input#passengers\\[1\\]\\.lastName');
    this.passengerBirthDateInput = page.locator('input[name="passengers\\[1\\]\\.birthDate"]');

    // Special Requests
    this.specialRequestsTextarea = page.locator('textarea[name="specialRequests"]');
    this.promoCodeCheckbox = page.locator('text="Mám promo kód"');

    // Room Details
    this.roomType = page.locator('text="Standardní pokoj s výhledem do zahrady"');
    this.allInclusiveCheckbox = page.locator('text="All inclusive"');

    // Navigation
     this.agreementsCheckbox = page.locator('label').filter({ hasText: 'Souhlasím s Všeobecnými' });
    this.continueButton = page.getByRole('button', { name: 'Pokračovat' });
  }

  async fillPersonalInformation(customer: {
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
  }) {
    await this.passengerTitleDropdown.fill(customer.title);
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.phoneInput.fill(customer.phone);
    await this.emailInput.fill(customer.email);
    await this.birthDateInput.fill(customer.birthDate);
    await this.streetInput.fill(customer.street);
    await this.streetNumberInput.fill(customer.streetNumber);
    await this.cityInput.fill(customer.city);
    await this.zipCodeInput.fill(customer.zipCode);
    await expect(this.emailInput).toHaveValue(customer.email);
  }

  async fillPassengerInformation(passenger: {
    title: string;
    firstName: string;
    lastName: string;
    birthDate: string;
  }) {
    await this.passengerTitleDropdown.click();
    await this.page.getByRole('button', { name: passenger.title }).click();
    await this.passengerFirstNameInput.fill(passenger.firstName);
    await this.passengerLastNameInput.fill(passenger.lastName);
    await this.passengerBirthDateInput.fill(passenger.birthDate);
  }

  async addSpecialRequests(request: string) {
    await this.specialRequestsTextarea.fill(request);
  }

  async acceptAllAgreements() {
    await this.agreementsCheckbox.click();
    await expect(this.agreementsCheckbox).toBeChecked();
  }

//   async completeBooking() {
//     await this.continueButton.click();
//     await expect(this.page).toHaveURL(/confirmation/);
//   }

  async selectPassengerTitle(title: 'Pan' | 'Paní') {
    await this.passengerTitleDropdown.click();
    await this.passengerTitleOptions.filter({ hasText: title }).click();
    await expect(this.passengerTitleDropdown).toContainText(title);
  }


  // Properly defined agreement acceptance method
  async acceptAgreementsAndContinue() {
    await this.agreementsCheckbox.click();
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/confirmation/);
  }
}

