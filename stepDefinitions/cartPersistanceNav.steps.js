const {Given, When, Then} =  require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const Locators = require("../Locators/cartPersistanceNav.locators");
const {cartPersistanceNav} = require("../Pages/cartPersistanceNav");

let namesinventory;
let namescart;
let namesinventagain;
let cartCount;

Given("I log into SauceDemo", async function(){

    this.CartPersistanceNav = new cartPersistanceNav(this.page);

});

When("I add two products", async function(){
     
    await this.CartPersistanceNav.select2Products();
    this.namesinventory = await this.CartPersistanceNav.getNames();

});

When("I am on cart page validate products", async function(){

    await this.CartPersistanceNav.goingCarttoValidate();
    this.cartCount = await this.CartPersistanceNav.getCartCount();
    console.log("the cart count is: ", this.cartCount);

});

When("I Navigate between inventory, product page", async function(){

    await this.CartPersistanceNav.navigateBtwPages();

});

When("I verify the cart Count remains unchanged", async function(){

    await expect(await this.CartPersistanceNav.getCartCount()).toBe(this.cartCount);
});

Then("I validate the selected products still show the remove button", async function(){

    
    namesinventagain = await this.CartPersistanceNav.getNames();
    await expect(this.namesinventory.join()).toBe(namesinventagain.join());
})