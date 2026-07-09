const { count } = require('node:console');
const Locators = require('../Locators/verifyFunctionalities.locators');
const { addAbortListener } = require('node:events');

class verifyFunctionalities{

    constructor(page){
        this.page = page;

        this.Items = page.locator(Locators.inventory_Item);
        this.ItemName = page.locator(Locators.inventory_Item_Name);
        this.ItemPrice = page.locator(Locators.inventory_Item_Price);

        this.addToCart = page.locator(Locators.add_To_Cart_Btn);
        this.removeButton = page.getByRole(Locators.removeBtn.role, {name : Locators.removeBtn.name});

        this.CartBadge = page.locator(Locators.cartBadge);

        this.HamburgerMenu = page.locator(Locators.hamburgerMenu);
        this.Hamburgerdata = page.locator(Locators.hamburgerContent);
        this.Reset = page.locator(Locators.Resetapp);
        this.menuClose = page.locator(Locators.menuCloseButton);
        this.logout = page.locator(Locators.Logout);
        
    }

    async selectItems(n=2){
        const count = await this.Items.count();

        const indices = [...Array(count).keys()];
        indices.sort(() => Math.random() - 0.5);

        const selected = indices.slice(0, n);

        for (const i of selected) {
            const item = this.Items.nth(i);
            await item.locator('button:has-text("Add to cart")').click();
        }
    }

    async getNames(){
    
            const names = [];
            const count = await this.Items.count();
    
            for(let i = 0; i < count; i++){
               
                const item  = this.Items.nth(i);
                const removeBtn = item.locator('button:has-text("Remove")');
    
                if(await removeBtn.isVisible()){
                    const nameText = await item.locator(Locators.inventory_Item_Name).innerText();
                    names.push(nameText);
                }
            }
            return names;
    }

    async getCartCount(){

        let count = await this.CartBadge.innerText();
        return count;

    }

    async clickOnHamburger(){

        await this.HamburgerMenu.click();
    }

    
    async getMenuItems(){
        return await this.page
            .locator('.bm-item-list a')
            .allTextContents();
    }


    async verifyItems(){
        
        const expected = ["All Items","About","Logout","Reset App State"];
        const actual = await this.getMenuItems();

        return JSON.stringify(expected) === JSON.stringify(actual);

    }

    async ResetApp(){
        
        await this.Reset.click();
        //await this.clickOnHamburger();
        await this.menuClose.click();

        // let count = await this.removeButton.count();
        // if(count > 0){
        //     await this.page.reload();
        // }

    }

    async getaddcartCount(){
        let count  = this.addToCart.count();
        return count;
    }

    async Logoutfunction(){

        await this.HamburgerMenu.click();
        await this.logout.click();
        
    }


}
module.exports = {verifyFunctionalities}