const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} =  require("@playwright/test");

const Locators = require("../Locators/checkOutFlow.locators");
const {checkOutFlow} = require("../Pages/checkOutFlow");

let prices;
let prices1;
let names;
let subTotal;
let tax;
let total;

Given("I Login on SauceDemo", async function(){

    this.CheckOutFLow = new checkOutFlow(this.page);

});

When("I add two items to cart", async function(){

    await this.CheckOutFLow.select2Products();
    let prices1 = await this.CheckOutFLow.GetPrices();
    console.log("checking on inventory page", prices1);

});

When("I goto checkout Page", async function(){

    await this.CheckOutFLow.gotoCheckout();
    await expect(this.page).toHaveURL(/checkout-step-one.html/i);

});

When("I am on checkoutpage click continue without filling Details and verify error message", async function(){

    await this.CheckOutFLow.continueWithoutDetails();
    await expect(this.page.locator(Locators.errormessage)).toBeVisible();

});

When("I fill the details and proceed to overview", async function(){

    await this.CheckOutFLow.continueDetails('Henry','Skallitz','567987');
    await expect(this.page).toHaveURL(/checkout-step-two.html/i);

});

When("I Calculate the price of selected items to comapare with the total", async function(){

    prices = await this.CheckOutFLow.getPrices();
    subTotal = await this.CheckOutFLow.getItemSubTotal();

    //checking on cart page.
    console.log(prices);
    console.log(subTotal);

    expect(prices).toBe(subTotal);

});

When("I verify tax , total amount", async function(){

    tax = await this.CheckOutFLow.getTax();
    console.log(tax);

    total = await this.CheckOutFLow.getTotal();
    console.log(total);

    await expect(prices + tax).toBe(total);
});

Then("I Complete the purchase to verify success info", async function(){

    await this.CheckOutFLow.Completeorder();
    await expect(this.page.locator(Locators.orderComplete)).toBeVisible();
    await this.CheckOutFLow.backHome();
    
})