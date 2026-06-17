const Locators = require("../Locators/ProductDetailsPageNav.locators");

class ProductDetailsPageNav{

    constructor(page){

        this.page = page;

        this.Items =  page.locator(Locators.inventory_Item);
        this.itmename = page.locator(Locators.inventory_name);

        this.itemDetailsName = page.locator(Locators.inventory_Item_Name);
        this.itemDetailsdesc = page.locator(Locators.inventory_Item_desc);
        this.itemDetailsPrice = page.locator(Locators.inventory_Item_price);
                
        this.addtocart = page.locator(Locators.add_To_Cart_Btn);
        this.backBtn = page.locator(Locators.backtoproducts);

    }

    async openAnyProduct(){
        let count = await this.Items.count();
        let random = Math.floor(Math.random() * count);
        await this.itmename.nth(random).click();

    }

    async validateDetails(){
        
        await this.itemDetailsName.waitFor();
        await this.itemDetailsdesc.waitFor();
        await this.itemDetailsPrice.waitFor();

    }

    async backToInventory(){

        await this.backBtn.click();

    }

    async verifyInventoryPage(){
        await this.Items.first().waitFor();
        let count = await this.Items.count();
        return count;
    }
}
module.exports = {ProductDetailsPageNav};