const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");

const creds = require("../test-data/credentials.json");
const {loginInventoryDetails} = require("../Pages/loginInventoryDeatils");

Given("I am on the Login Page", async function(){

    this.LoginInventoryDetails = new loginInventoryDetails(this.page);
    await this.LoginInventoryDetails.goto(creds.url);

});

When("I Login into to the site", async function(){

    await this.LoginInventoryDetails.login(creds.Valid_userName, creds.Password_FA);

});

When("I login successfully take me to inventory Page", async function(){

    await expect(this.page).toHaveURL(creds.inventory_url);
    console.log("On correct Page!");
});

When("I am on inventory page get total number of products", async function(){

    console.log(await this.LoginInventoryDetails.productCount());

})

Then("I check if each inventory item has a name, price, description, Add-to-cart button", async function(){

    this.namePresent = await this.LoginInventoryDetails.checkName();
    this.descCheck = await this.LoginInventoryDetails.checkDesc();
    this.priceCheck = await this.LoginInventoryDetails.checkPrice();
    this.btnCheck = await this.LoginInventoryDetails.checkAddToCartBtn();
    
    if(this.namePresent == true && this.descCheck == true && this.priceCheck == true && this.btnCheck == true){
        console.log("Name, price, desc, btn are present in each item! yay");
    }
});