import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage';
import HotelPage from '../pages/hotelPage';
import BookingPage from '../pages/bookingPage';

test('Books Flight & Hotels', async ({ page }) => {
    const homePage = new HomePage(page);
    const hotelPage = new HotelPage(page);
    const bookingPage = new BookingPage(page);

    // Navigate and handle cookies
    await homePage.navigateTo('https://www.blue-style.cz/');
    // await page.pause();

    await homePage.acceptCookies();

    // Select destinations - each method should handle its own waiting
    await homePage.selectDepartureCity('Praha');
    await homePage.selectArrivalDestination('Egypt Toggle');

    // Select dates
    await homePage.selectDepartureDate('Fri May 16', '16Termín odletu');

    // Verify results
    await homePage.showTripsButton.click();
    await expect(page.getByText('Available trips')).toBeVisible();

    // Hotel selection
    await page.goto('https://www.blue-style.cz/egypt/hurghada/hotel-pickalbatros-dana-beach-resort/');
    await hotelPage.reserveHotel();

    // Fill customer info
    await hotelPage.fillCustomerInfo({
        firstName: 'test',
        lastName: 'user',
        phone: '+420 765 787 654',
        email: 'test23@gmail.com'
    });


    // Fill additional details
    await bookingPage.selectPassengerTitle('Pan'); // Selecting "Mr"
    await bookingPage.acceptAgreementsAndContinue();

    // Verification
    await expect(page.getByText('Rezervace byla úspěšná')).toBeVisible();

});