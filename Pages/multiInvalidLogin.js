const Locators = require("../Locators/multiInvalidLogin.locators");
const creds = require("../test-data/credentials.json");

class multiInvalidLogin{

    constructor(page){

        this.page  = page;
        this.userNameField = page.getByPlaceholder(Locators.userName_Field);
        this.passWordField = page.getByPlaceholder(Locators.passWord_Field);
        this.errorMessage = page.locator(Locators.errormessage);
        this.errorClose = page.locator(Locators.errorclose);
        this.LoginBtn = page.locator(Locators.loginBtn);

    }

    async goto(url){
        await this.page.goto(url);
    }

    async loginInvalidCreds(username, password){
        let message = [];

        await this.userNameField.fill(username);
        await this.passWordField.fill(password);
        await this.LoginBtn.click();

        message.push(await this.errorMessage.innerText());
        return message;
    }

    async closeMessage(){
        await this.errorClose.click();
    }

    
}
module.exports = {multiInvalidLogin}