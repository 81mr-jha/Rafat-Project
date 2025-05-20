import { Page,Locator,expect } from '@playwright/test';
import BasePage from './basePage';

export default class HomePage extends BasePage {
  // Locators
  readonly departureCity = this.page.locator('[id="wrapper\\.depCity"] span').nth(3);
  readonly cityOption = (name: string) => this.page.getByRole('button', { name });
  readonly arrivalToggle = this.page.getByRole('button', { name: 'Místo příletu' });
  readonly selectButton = this.page.getByRole('button', { name: 'Vybrat' });
  readonly showTripsButton = this.page.getByRole('button', { name: 'Zobrazit zájezdy' });

  constructor(page: Page) {
    super(page);
  }

  async selectDepartureCity(city: string) {
    await this.departureCity.click();
    await this.cityOption(city).click();
  }

  async selectArrivalDestination(destination: string) {
    await this.arrivalToggle.click();
    await this.cityOption(destination).click();
    await this.selectButton.click();
  }

  async selectDepartureDate(dateLabel: string, dayText: string) {
    await this.page.locator('.dayPickerInput__val').click();
    await this.page.getByLabel(dateLabel).getByText(dayText).click();
    await this.page.getByRole('button', { name: 'Vybrat a zavřít' }).click();
  }
}