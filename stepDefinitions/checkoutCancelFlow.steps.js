const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const Locators = require("../Locators/checkoutCancelFlow.locators");
const {checkoutCancelFlow} = require("../Pages/checkoutCancelFlow");


Given("I am SauceDemo site", async function(){

    this.CheckoutCancelFlow = new checkoutCancelFlow(this.page);

});

When("add products into cart", async function(){

    await this.CheckoutCancelFlow.selectProducts();
    this.names = await this.CheckoutCancelFlow.getNames();
    console.log("added products names", this.names);
    this.cartCount = await this.CheckoutCancelFlow.getCartCount();
    console.log("the cart count is: ", this.cartCount);

});

When("I start checkout process", async function(){

    await this.CheckoutCancelFlow.gotoCheckout();
    
});

When("I cancel from customer's info page", async function(){

    await this.CheckoutCancelFlow.clickCancel();
    await expect(this.page).toHaveURL(/cart/i);

});

When("I verify the products in the cart", async function(){

    await expect(await this.CheckoutCancelFlow.getCartCount()).toBe(this.cartCount);
});

When("I checkout again but cancel it on the overview page", async function(){

    await this.CheckoutCancelFlow.gotoCheckout();
    await this.CheckoutCancelFlow.continueDetails("Riyan","Parag","7654098");
    await this.CheckoutCancelFlow.clickCancel();
});

Then("I check if the cart data is retained", async function(){

    await expect(this.page).toHaveURL(/inventory/i);
    await expect(await this.CheckoutCancelFlow.getCartCount()).toBe(this.cartCount);

})

