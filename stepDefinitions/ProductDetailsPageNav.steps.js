const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const Locators = require("../Locators/ProductDetailsPageNav.locators");
const {ProductDetailsPageNav} = require("../Pages/ProductDetailsPageNav");

Given("I login to the Application", async function(){

    this.productDetailsPageNav = new ProductDetailsPageNav(this.page);

});

When("I am on inventory page click on any product", async function(){

    await this.productDetailsPageNav.openAnyProduct();

});

When("I Validate product name, description, price", async function(){

    await this.productDetailsPageNav.validateDetails();

});

When("I navigate back to inventory page", async function(){

    await this.productDetailsPageNav.backToInventory();

    await expect(this.page).toHaveURL(/inventory/i);
})

Then("I Verify all products are displayed", async function(){

    let count = await this.productDetailsPageNav.verifyInventoryPage();
    expect(count).toBe(6);
    
});