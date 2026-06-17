const Locators = require("../Locators/checkoutCancelFlow.locators");

class checkoutCancelFlow{

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
        this.Cancelbtn = page.locator(Locators.cancelBtn);
        this.checkoutButton = page.locator(Locators.checkOutPage);
        this.continueShopp = page.locator(Locators.continueShopping);
        this.continueButton = page.locator(Locators.continueBtn);

        this.CheckOutFirstname = page.locator(Locators.checkOutFirstName);
        this.CheckOutLastname = page.locator(Locators.checkOutLasttName);
        this.CheckOutZip = page.locator(Locators.checkOutZipCode);

    }

    async selectProducts(n = 3) {

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

    async gotoCheckout(){


        await this.shoppingCart.click();
        //await this.page.waitForTimeout(1000);
        await this.checkoutButton.click();
        //await this.page.waitForTimeout(1000);

    }

    async clickCancel(){
        await this.Cancelbtn.click();
        //await this.page.waitForTimeout(200);
    }

    async getCartCount(){

        let cartcount = await this.CartBadge.innerText();
        return cartcount;

    }

    async continueDetails(firstname, lastname, zipcode){

        await this.CheckOutFirstname.fill(firstname);
        await this.CheckOutLastname.fill(lastname);
        await this.CheckOutZip.fill(zipcode);
        await this.continueButton.click();

    }
}
module.exports = {checkoutCancelFlow};