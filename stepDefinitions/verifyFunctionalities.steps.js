const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const Locators = require("../Locators/verifyFunctionalities.locators");
const {verifyFunctionalities} = require("../Pages/verifyFunctionalities");

Given("I login with valid credentials", async function(){

    this.VerifyFunctioinalities = new verifyFunctionalities(this.page);

});

When("I add two products into cart", async function(){

    await this.VerifyFunctioinalities.selectItems();
    this.names = await this.VerifyFunctioinalities.getNames();
    console.log("selected products: ", this.names);

});

When("I verify cart Count", async function(){

    this.cartCount  = await this.VerifyFunctioinalities.getCartCount();
    await expect(this.names.length).toBe(Number(this.cartCount));

});

When("I click the Hamburger menu", async function(){

    await this.VerifyFunctioinalities.clickOnHamburger();

});

When("I extract all the menu items to stor into a list", async function(){

    this.menuItmes = await this.VerifyFunctioinalities.getMenuItems();
    console.log("the menu data: ", this.menuItmes);
});

When("I verify the extracted items", async function(){

    console.log(await this.VerifyFunctioinalities.verifyItems());

});

When("I Verify the total number of menu items matches the expected count", async function(){

    expect(this.menuItmes.length).toBe(4);

});

When("I reset the app state", async function(){

    await this.VerifyFunctioinalities.ResetApp();

});

When("I check the cart badge is reset , add to cart is visibel for all", async function(){

    //this.cartCountAgain = await this.VerifyFunctioinalities.getCartCount();
    expect(this.page.locator(Locators.cartBadge)).toBeHidden();
    await this.page.reload();
    this.addtocartCount  = await this.VerifyFunctioinalities.getaddcartCount();
    expect(this.addtocartCount).toBe(6);
});

When("I hamburger menu again and click Logout", async function(){

    await this.VerifyFunctioinalities.Logoutfunction();

});

When("I Verify the user is redirected to the login page", async function(){

    await expect(this.page).toHaveURL("https://www.saucedemo.com/");


});

When("I try to access the inventory page directly", async function(){

    await this.page.goto("https://www.saucedemo.com/inventory.html");
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    await expect(this.page.locator(Locators.errorMessage)).toBeVisible();

});

Then("I verify the previous session is not accessible", async function(){

    await this.page.goBack();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");

});