import { expect, Page } from '@playwright/test';

export default class BasePage {

  constructor(public page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' }); 
  }

  async acceptCookies() {
    const cookieBanner = this.page.locator('text="We use cookies"').first();
    if (await cookieBanner.isVisible()) {
      await this.page.click('//button[@id="c-p-bn"]');
      await expect(cookieBanner).toBeHidden();
    }
  }
}