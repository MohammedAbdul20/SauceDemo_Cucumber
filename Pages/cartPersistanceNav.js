const Locators  = require("../Locators/cartPersistanceNav.locators");

class cartPersistanceNav{

    constructor(page){
        this.page = page;

        this.Items =  page.locator(Locators.inventory_Item);
        this.cartItem = page.locator(Locators.cartitem);

        this.itemName = page.locator(Locators.inventory_Item_Name);
        this.itemPrice = page.locator(Locators.inventory_Item_Price);

        this.addtocart = page.locator(Locators.add_To_Cart_Btn);
        this.removeButton = page.getByRole(Locators.removeBtn.role, {name : Locators.removeBtn.name});
                
        this.CartBadge = page.locator(Locators.cartBadge);

        this.shoppingCart = page.locator(Locators.shoppingCartLink);
        this.cart_Name = page.locator(Locators.cartName);
        this.cart_Price = page.locator(Locators.cartPrice);

        this.Backbtn  = page.locator(Locators.backtoproducts);
        this.continueShopp = page.locator(Locators.continueShopping);
    }

    
    async select2Products(n = 2) {
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

            if(await removeBtn.isVisible){
                const nameText = await item.locator(this.itemName).innerText();
                names.push(nameText);
            }
        }
        return names;
    }

    async getCartProductNames(){

        let names = [];
        let count = await this.cartItem.count();

        for(let i = 0; i < count; i++){
            let name = await this.cart_Name.nth(i).innerText();
            names.push(name);   
        }
        return names;
    }

    async goingCarttoValidate(){
        
        let namesInventory = await this.getNames();

        await this.shoppingCart.click();
        
        let namescart = await this.getCartProductNames();

        return namesInventory.join() === namescart.join();

    }

    async openAnyProduct(){

        let count = await this.Items.count();
        let random = Math.floor(Math.random() * count);
        await this.itemName.nth(random).click();

    }

    async navigateBtwPages(){

        await this.continueShopp.click();
        await this.openAnyProduct();
        await this.Backbtn.click();

    }

    async getCartCount(){

        let cartcount = await this.CartBadge.innerText();
        return cartcount;

    }

}
module.exports = {cartPersistanceNav}