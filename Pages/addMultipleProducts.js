const Locators = require("../Locators/addMultipleProducts.locators");
const {expect} = require("@playwright/test")

class addMultipleProducts{

    constructor(page){
        this.page = page;
        this.addtocart = page.locator(Locators.addToCartBtn);
        this.itemName = page.locator(Locators.Item_name);
        this.removeButton = page.getByRole(Locators.removeBtn.role, {name : Locators.removeBtn.name});
        this.Item =  page.locator(Locators.Inventory_Item);
        this.CartBadge = page.locator(Locators.cartBadge);
    }

    async extractLabels(){
        let names = [];
        let count = await this.Item.count();

        for(let i = 0; i < count; i++){
            names.push(await this.itemName.nth(i).innerText());
        }
        return names;
    }

    async add3products(){
        for(let i = 0; i < 3; i++){
            await this.addtocart.nth(i).click();
            //await this.page.waitForTimeout(2000);
        }
    }

    async isRemoveVisible(){
        for(let i = 0; i < 3; i++){
            await expect(this.removeButton.nth(i)).toBeVisible();
        }
        console.log("the remove buttons is visible");
    }

    async cartCount(){
        return await this.CartBadge.innerText();
    }

    async pageReload(){
        await this.page.reload();
    }
}
module.exports = {addMultipleProducts};