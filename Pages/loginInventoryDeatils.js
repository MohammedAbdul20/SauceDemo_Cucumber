const Locators = require("../Locators/loginInventoryDetails.locators");

class loginInventoryDetails{

    constructor(page){

        this.page = page;
        this.InventoryItem = page.locator(Locators.inventory_Item);
        this.ItemName = page.locator(Locators.inventory_Item_Name);
        this.ItemDesc = page.locator(Locators.inventory_Item_Desc);
        this.ItemPrice = page.locator(Locators.inventory_Item_Price);
        this.addToCartBtn = page.locator(Locators.add_To_Cart_Btn);
    
    }

    async goto(url){
        await this.page.goto(url);
    }

    async login(username, password){
        await this.page.getByPlaceholder(Locators.userName_Field).fill(username);
        await this.page.getByPlaceholder(Locators.passWord_Field).fill(password);
        await this.page.locator(Locators.loginBtn).click();
    }

    async productCount(){
        return await this.InventoryItem.count();
    }

    async checkName(){ 
        let count = await this.ItemName.count();

        for (let i = 0; i < count; i++) {
            const title = await this.ItemName.nth(i).innerText();

            if (!title || title.trim() === "") {
                return false;
            }
        }
        return true;
    }

    async checkDesc(){
        let count = await this.InventoryItem.count();

        for (let i = 0; i < count; i++){
            const desc = await this.ItemDesc.nth(i).innerText();

            if(!desc || desc.trim() === ""){
                return false;
            }
        }
        return true;
    }

    async checkPrice(){
        let count = await this.InventoryItem.count();

        for (let i = 0; i < count; i++){
            const price = await this.ItemPrice.nth(i).innerText();

            if(!price || price.trim() === ""){
                return false;
            }
        }
        return true;
    }

    async checkAddToCartBtn(){
        let count = await this.InventoryItem.count();

        for (let i = 0; i < count; i++){
            const Btn = await this.addToCartBtn.nth(i).innerText();

            if(!Btn || Btn.trim() === ""){
                return false
            }
        }
        return true;
    }
}
module.exports = {loginInventoryDetails};