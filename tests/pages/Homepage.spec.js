class HomePage{
    
    constructor(page){
        DeparturePoint = page.locator('[id="wrapper\\.depCity"] span').nth(3).click();
        SelectDeparturePoint = page.getByRole('button', { name: 'Praha' }).click();

        
    }

}