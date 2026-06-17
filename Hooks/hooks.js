const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const cred = require("../test-data/credentials.json");

const {loginInventoryDetails} = require("../Pages/loginInventoryDeatils");

setDefaultTimeout(60000);

Before(async function(){

    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();

})

Before( {tags: "@validLogin"} ,async function () {
    
    this.LoginInventoryDetails = new loginInventoryDetails(this.page);
    await this.LoginInventoryDetails.goto(cred.url);
    await this.LoginInventoryDetails.login(cred.Valid_userName, cred.Password_FA);

    
});

After(async function () {
    await this.browser.close();
});