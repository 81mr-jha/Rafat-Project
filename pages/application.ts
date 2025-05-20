import { Page } from "@playwright/test";

import HomePage from "./homePage"
import HotelPage from "./hotelPage";
import BookingPage from "./bookingPage";

export default class Application {
    protected page: Page;
    HomePage: HomePage;
    HotelPage: HotelPage;
    Booking: BookingPage;

    constructor(page: Page) {
        this.page = page;
        this.HomePage = new HomePage(page);
        this.HotelPage = new HotelPage(page);
        this.Booking = new BookingPage(page);
    }
}