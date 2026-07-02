const Locators = require("../Locators/checkOutFlow.locators");

class checkOutFlow{

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

        this.CheckOutFirstname = page.locator(Locators.checkOutFirstName);
        this.CheckOutLastname = page.locator(Locators.checkOutLasttName);
        this.CheckOutZip = page.locator(Locators.checkOutZipCode);
        this.ChecOutBtn = page.locator(Locators.checkOutPage);
        this.continueButton = page.locator(Locators.continueBtn);
        
        this.CheckOutSubTotal = page.locator(Locators.checkOutSubtotal);
        this.CheckOuttax = page.locator(Locators.checkOutTax);
        this.CheckOuttotal = page.locator(Locators.checkOutTotal);
        this.CheckOutFinishBtn = page.locator(Locators.checkoutFinish);

        this.completeOrder = page.locator(Locators.orderComplete);
        this.BackHome = page.locator(Locators.backHomeBtn);

    }
    
    async select2Products(n = 2) {
        const count = await this.addtocart.count();

        const indices = [...Array(count).keys()];

        indices.sort(() => Math.random() - 0.5);

        const selected = indices.slice(0, n);

        for (const i of selected) {
            await this.addtocart.nth(i).click();
        }
    }


    // async GetNames(){

    //     let names =[];
    //     let count = await this.Items.count();

    //     for(let i = 0; i < count; i++){
    //         //const item = this.Items.nth(i);

    //         if(await this.removeButton.count() > 0){
    //             names.push(await this.itemName.nth(i).innerText());
    //         }
    //     }
    //     return names;
    // }

    // async GetPrices(){

    //     let prices =[];
    //     let count = await this.Items.count();

    //     for(let i = 0; i < count; i++){
    //         const item = this.Items.nth(i);

    //         if(await this.removeButton.isVisible()){
    //             let price = await this.itemPrice.innerText()
    //             prices.push(parseFloat(price.replace(/[$,]/g, '')));
    //         }
    //     }
    //     return prices;
    // }

    
    async GetPrices() {
        const prices = [];
        const count = await this.Items.count();

        for (let i = 0; i < count; i++) {
            const item = this.Items.nth(i);

            const removeBtn = item.locator('button:has-text("Remove")');

            if (await removeBtn.isVisible()) {
                const priceText = await item.locator('.inventory_item_price').innerText();
                prices.push(parseFloat(priceText.replace('$', '')));
            }
        }
        return prices.reduce((total,val) => total + val, 0);
    }


    async gotoCheckout(){
        await this.shoppingCart.click();
        await this.ChecOutBtn.click();

    }

    async continueWithoutDetails(){
        await this.continueButton.click();
    }

    async continueDetails(firstname, lastname, zipcode){

        await this.CheckOutFirstname.fill(firstname);
        await this.CheckOutLastname.fill(lastname);
        await this.CheckOutZip.fill(zipcode);
        await this.continueButton.click();

    }

    async getPrices(){
        let prices = [];
        let count = await this.cartItem.count();

        for(let i = 0; i < count; i++){
            let price = await this.cart_Price.nth(i).innerText();
            prices.push(parseFloat(price.replace(/[$,]/g, '')));
        }
        return prices.reduce((total,val) => total + val, 0);
    }

    async getItemSubTotal(){
        
        let subTotal = await this.CheckOutSubTotal.innerText();
        return parseFloat(subTotal.replace("Item total: $",''));

    }

    async getTax(){
        let taxamt = await this.CheckOuttax.innerText();
        return parseFloat(
            parseFloat(taxamt.replace("Tax: $", "")).toFixed(2)
        );
    }

    async getTotal(){
        let totalamt = await this.CheckOuttotal.innerText();  
        return parseFloat(
                parseFloat(totalamt.replace("Total: $", "")).toFixed(2)
        );
    }

    async Completeorder(){
        await this.CheckOutFinishBtn.click();
    }

    async backHome(){
        await this.BackHome.click();
    }
}
module.exports = {checkOutFlow};
