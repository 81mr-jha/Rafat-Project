import { test, expect } from '@playwright/test';

test('Books Flight & Hotels', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.blue-style.cz/');
    await page.pause();

    // Cookie handling - wait for banner and accept if present
    try {
        const cookieBanner = page.locator('text="We use cookies"').first();
        await cookieBanner.waitFor({ state: 'visible', timeout: 5000 });

        // Accept all cookies - adjust selector based on actual button text
        await page.click('//button[@id="c-p-bn"]');
        console.log('Cookie banner accepted');
    } catch (error) {
        console.log('No cookie banner found or already accepted');
    }
    await page.waitForTimeout(3000);

    // await page.locator('//span[@id="react-select-depCity--value-item"]').first().click();
    // await page.locator('.Select.has-value.Select--single').click();
    await page.locator('[id="wrapper\\.depCity"] span').nth(3).click();
    await page.getByRole('button', { name: 'Praha' }).click();
    await page.waitForTimeout(3000);

    // 1. Click the dropdown to expand the menu
    // await page.locator('button.btn--custom[aria-haspopup="true"]').first().click();

    // 2. Wait for the checkbox to be visible, then check it
    // const checkbox = page.locator('input[type="checkbox"][name="8-8"]');
    // await checkbox.waitFor({ state: 'visible' });
    // await checkbox.check(); 
    // better than .click() for checkboxes
    await page.getByRole('button', { name: 'Místo příletu' }).click();
    // await page.locator('//button[contains(text(),"Místo příletu")]');
    await page.getByRole('button', { name: 'Egypt Toggle' }).click();
    await page.getByRole('button', { name: 'Vybrat' }).click();

    await page.waitForTimeout(1000);

    await page.locator('.dayPickerInput__val').click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Fri May 16').getByText('16Termín odletu').click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Vybrat a zavřít' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Zobrazit zájezdy' }).click();

    await page.waitForTimeout(1500);

    // await page.locator('.hideOnDesktop > .hotelCard__btn > .btn').first().click();
  await page.goto('https://www.blue-style.cz/egypt/hurghada/hotel-pickalbatros-dana-beach-resort/?airline=Smartwings&arrCity=9&date=2025-05-16&depCity=2&duration=7&room1=2%7CSRGV%7CAI');
  await page.getByRole('button', { name: 'Rezervovat' }).click();

    // const hotelName = page.locator('.hotelHeader__name, h1.hotel-title'); // Adjust selector as needed
    // await expect(hotelName).toBeVisible();


    // // Log the hotel name to the console (optional)
    // const nameText = await hotelName.textContent();
    // console.log('Hotel Page Title:', nameText?.trim());

    // await page.getByRole('button', { name: 'Rezervovat' }).click();
    // await page.waitForTimeout(5000);
    // await page.waitForSelector('button:has-text("Rezervovat")', { timeout: 10000 });
    await page.waitForTimeout(3000);

    await page.locator('//input[@id="customer.firstName"]').fill('test');

    await page.waitForTimeout(3000);

    // await page.locator('//input[@id="customer.lastName"]').fill('user');
      await page.locator('[id="customer\\.lastName"]').fill('user');
    await page.waitForTimeout(3000);
    await page.locator('//input[@id="customer.phone"]').fill('+420 765 787 654');
    await page.waitForTimeout(3000);
    await page.locator('//input[@id="customer.email"]').fill('test23@gmail.com');
    await page.locator('input[name="customer.birthDate"]').fill('02.03.2003');
    await page.getByRole('textbox', { name: 'Ulice' }).fill('test');
    await page.getByRole('textbox', { name: 'Číslo popisné' }).fill('31');
    await page.locator('input[name="customer.address.zip"]').fill('43433');
    await page.locator('//input[@id="customer.address.city"]').fill('Test address 2/233');
    await page.waitForTimeout(3000);

    await page.locator('[id="wrapper\\.passengers\\[0\\]\\.title"] span').nth(2).click();
    await page.getByRole('button', { name: 'Pan', exact: true }).click();
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Paní' }).click();
    await page.locator('input#passengers\\[1\\]\\.firstName').fill("Mighty");
    await page.locator('input#passengers\\[1\\]\\.lastName').fill("Raju");
    await page.locator('input[name="passengers\\[1\\]\\.birthDate"]').fill('02.01.2010');
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Pokračovat' }).click();
    await page.locator('label').filter({ hasText: 'Souhlasím s Všeobecnými' }).locator('div').click();
    await page.waitForTimeout(3000);
    await page.locator('label').filter({ hasText: 'Četl/a jsem a souhlasím se zá' }).locator('div').click();
    await page.getByRole('button', { name: 'Pokračovat' }).click();

    await page.locator('label').filter({ hasText: 'Seznámil/a jsem se a souhlasí' }).locator('div').click();

});