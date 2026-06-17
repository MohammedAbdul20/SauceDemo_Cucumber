const { Given, When, Then} = require("@cucumber/cucumber");
const { expect} = require("@playwright/test");

const creds = require("../test-data/credentials.json");
const {cartDetailsRemoveFunc} = require("../Pages/cartDetailsRemoveFunc");


let products;
let cartproducts;
let removed;

Given("I am on the sauce site", async function(){

    this.CartDetailsRemoveFunc = new cartDetailsRemoveFunc(this.page);

});

When("I am on the inventory page add first three products", async function(){

    await this.CartDetailsRemoveFunc.add3products();
    console.log("clicked on some products");

});

When("I get the added products name and price", async function(){

    products = await this.CartDetailsRemoveFunc.productsAddedToCart();
    console.log("Invetory page: ", products);

});

When("I go to cart page", async function(){

    await this.CartDetailsRemoveFunc.goTocart();

    console.log("going to cart");

})

When("I get the cart product name, price", async function(){

    cartproducts = await this.CartDetailsRemoveFunc.cartData();
    console.log("cart Products: ", cartproducts);

});

When("I remove a product from the cart", async function(){

    removed = await this.CartDetailsRemoveFunc.clickOneRemove();
    console.log("removed Product: ", removed);

});

Then("I verify the cart count decreases", async function(){

    await expect(await this.CartDetailsRemoveFunc.cartBadgeNo()).toBe("2");

});

When("I check the removed is no longer displayed", async function(){

    await expect(await this.page.getByText(removed)).not.toBeVisible();
    console.log("everything good");
    
})