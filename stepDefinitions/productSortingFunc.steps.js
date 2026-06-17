const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const Locators = require("../Locators/productSortingFunc.locators");

const {productSortingFunc} = require("../Pages/productSortingFunc");

let names;
let prices;

Given("I am on SauceDemo", async function(){

    this.ProductSortingFunc = new productSortingFunc(this.page);

});

When("I am the inventory page I get all the names, prices of the products", async function(){

    names = await this.ProductSortingFunc.getAllNames();
    console.log(names);
    prices = await this.ProductSortingFunc.getAllPrices();
    console.log(prices);

});

Then("I Verify the A-Z Sorting", async function(){

    await this.ProductSortingFunc.dropdownOption(Locators.AZSort);
    console.log(await this.ProductSortingFunc.isAscending(names));
    console.log("the list is in Ascending Order.");

});

When("I verify the Z-A Sorting", async function(){

    await this.ProductSortingFunc.dropdownOption(Locators.ZASort);
    console.log(await this.ProductSortingFunc.isDescending(names));
    console.log(" the list is in Descending order");

});

When("I verify the Low to high price Sorting", async function(){

    await this.ProductSortingFunc.dropdownOption(Locators.LowtoHighSort);
    console.log(await this.ProductSortingFunc.Pricelohi(prices));
    console.log("Prices are in ascending order");

});

When("I verify the High to Low Price Sorting", async function(){

    await this.ProductSortingFunc.dropdownOption(Locators.HighToLowSort);
    console.log(await this.ProductSortingFunc.Pricehilo(prices));
    console.log("the prices are in descending order");
    
});




