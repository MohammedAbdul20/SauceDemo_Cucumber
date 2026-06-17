const  {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const Locators = require("../Locators/multiInvalidLogin.locators");
 
const creds = require("../test-data/credentials.json");
const {multiInvalidLogin} = require("../Pages/multiInvalidLogin");

let meassage = [];

Given("I am login page", async function(){

    this.MultiInvalidLogin = new multiInvalidLogin(this.page);
    await this.MultiInvalidLogin.goto(creds.url);

});

When("I am on the page I try multiple invlaid credentials , get the error message", async function(){

    meassage.push(await this.MultiInvalidLogin.loginInvalidCreds(creds.Valid_userName,creds.Invalid_password));
    meassage.push(await this.MultiInvalidLogin.loginInvalidCreds(creds.Invalid_username,creds.Invalid_password));
    meassage.push(await this.MultiInvalidLogin.loginInvalidCreds(creds.Invalid_username,creds.Password_FA));
    meassage.push(await this.MultiInvalidLogin.loginInvalidCreds(creds.Locked_user,creds.Password_FA));
    console.log(meassage);

});

Then("I chek if the error message can be closed", async function(){

    await this.MultiInvalidLogin.closeMessage();
    await expect(this.page.locator(Locators.errormessage)).toBeHidden();
    console.log("Pass");

})