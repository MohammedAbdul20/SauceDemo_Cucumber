const {Given, Then, When} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const creds = require("../test-data/credentials.json");
const {addMultipleProducts} = require("../Pages/addMultipleProducts");

Given("I am on the site", async function(){
    
    this.AddMultipleProducts = new addMultipleProducts(this.page);
});

When("I get on inventory page extract all the names", async function(){

    console.log(await this.AddMultipleProducts.extractLabels());
});

When("I add first three products to cart", async function(){

    await this.AddMultipleProducts.add3products();
});

When("I check remove buttons for three Items", async function(){

    await this.AddMultipleProducts.isRemoveVisible();
    //console.log("checking for remove buttons..")
});

When("I verify the cart bagde displays three", async function(){

    await expect(await this.AddMultipleProducts.cartCount()).toBe("3");
    console.log("three items on cart badge");

});

Then("I reload the page to see if the data is retained", async function(){

    await this.AddMultipleProducts.pageReload();
    //await this.AddMultipleProducts.waitForTimeout(1500);
    await expect(await this.AddMultipleProducts.cartCount()).toBe("3");
    console.log("The content does not change");
})
