const Locators = require("../Locators/cartDetailsRemoveFunc.locators");

class cartDetailsRemoveFunc{

    constructor(page){
        this.page = page;
        
        this.Items =  page.locator(Locators.Inventory_Item);
        this.cartItem = page.locator(Locators.cartInventoryItem);
        this.itemName = page.locator(Locators.Item_name);
        this.itemPrice = page.locator(Locators.Item_price);

        this.addtocart = page.locator(Locators.addToCartBtn);
        this.removeButton = page.getByRole(Locators.removeBtn.role, {name : Locators.removeBtn.name});
        
        this.CartBadge = page.locator(Locators.cartBadge);

        this.shoppingCart = page.locator(Locators.shoppingCartLink);
        this.cart_Name = page.locator(Locators.cartName);
        this.cartPrice = page.locator(Locators.cartPrice);
    }

    async add3products(){
        for(let i = 0; i < 3; i++){
            await this.addtocart.nth(i).click();
            //await this.page.waitForTimeout(2000);
        }
    }

    async productsAddedToCart() {
    const addedProducts = [];
    //const items = this.page.locator('.inventory_item');
    const count = await this.Items.count();

    for (let i = 0; i < count; i++) {
        //const item = this.Items.nth(i);
        //const removeBtn = item.getByRole('button', { name: /Remove/i });

        // Check if this product has a Remove button at all
        // if (await this.removeButton.count() > 0 && await this.removeButton.nth(i).isVisible()) {
            //const nameLocator = item.locator('.inventory_item_name');
            const name = await this.itemName.nth(i).textContent();
            const price = await this.itemPrice.nth(i).textContent();
            addedProducts.push({name, price});
        //}
    }

    return addedProducts;
    }

    async goTocart(){
        await this.shoppingCart.click();
    }

    async cartData(){
        let cartProduct = [];
        let count = await this.cartItem.count();

        for(let i = 0; i < count; i++){
            const name = await this.cart_Name.nth(i).textContent();
            const price = await this.cartPrice.nth(i).textContent();
            cartProduct.push({name, price});
        }
        return cartProduct;
    }

    async clickOneRemove(){
        let removedItem = [];
        const random = Math.floor(Math.random() * 3);
        removedItem.push(await this.cart_Name.nth(random).innerText());
        await this.removeButton.nth(random).click();
        return removedItem;
    }

    async cartBadgeNo(){
        return await this.CartBadge.innerText();
    }
}
module.exports = {cartDetailsRemoveFunc};