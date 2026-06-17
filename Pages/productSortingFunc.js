const { count } = require("node:console");
const Locators = require("../Locators/productSortingFunc.locators");

class productSortingFunc{

    constructor(page){

        this.page = page;
        this.Item = page.locator(Locators.inventory_Item);
        this.Item_name = page.locator(Locators.inventory_Item_Name);
        this.Item_price = page.locator(Locators.inventory_Item_Price);
        this.Filter = page.locator(Locators.sortFilter);

    }

    async getAllNames(){
        
        let Names = [];
        const count = await this.Item.count();
        
        for(let i = 0; i < count; i++){

            const name = await this.Item_name.nth(i).innerText();
            //const price = await this.Item_price.nth(i).innerText();
            Names.push(name);

        }
        return Names;

    }

    async getAllPrices(){

        let prices = [];
        const count = await this.Item.count();

        for(let i = 0; i < count; i++){

            const price = await this.Item_price.nth(i).innerText();
            prices.push(parseFloat(price.replace('$','')));

        }
        return prices;

    }

    async dropdownOption(Option){
        await this.Filter.selectOption(Option);
    }

    async isAscending(list){

        const Nameslist = await this.getAllNames();
        // let count = await this.Item.count()

        // for(let i = 0; i < count; i++){
        //     if(Nameslist[i] === list[i]){
        //     console.log("_");
        //     }
        // }

        return Nameslist.join() === list.join();

    }

    async isDescending(list){

        const Nameslist = await this.getAllNames();
        let checkList = list.reverse();
        console.log(Nameslist);
        return Nameslist.join() === checkList.join();

    }

    async Pricelohi(list){

        const PriceList = await this.getAllPrices();

        console.log(PriceList);
        let checklist  = list.sort((a,b) => a - b);
        return PriceList.every((value, index) => value === checklist[index]);

    }

    async Pricehilo(list){

        const PriceList = await this.getAllPrices();

        console.log(PriceList);
        let checklist  = list.sort((a,b) => b - a);
        return PriceList.every((value, index) => value === checklist[index]);

    }

}
module.exports = {productSortingFunc}