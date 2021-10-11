//TODO:
//The results page final price needs to be changed.
//If you're buying the ingredients from the ge, you will buy EITHER grimy or clean herbs for instance, NOT both.
//Need to give the choice: which stage of the process you want?
//Completely from scratch: i.e. buying vials and grimy herbs? final price is then the price of vials, grimy herbs, and secondary.
//Buying unfinied potions and secondaries? final price is then the price of the (unf) and secondary
//etc...

const ExpressError = require("../utils/ExpressError");
const {
    getItemByName,
    setIngredients,
    setImage,
    untradeableItems,
    getCoinPile
} = require("../utils/potionDataHelpers");

module.exports.renderIndex = async (req,res)=>{
    console.log("renderIndex Called")
    console.log(req.session);
    res.render("index",{pageTitle:"PotionChain"}) ;
}

module.exports.showResults = async (req,res)=>{  
    console.log(req.query);
    const name = req.query.name;
    const number = parseInt(req.query.number);
    const display = req.query.display;
    let finalPrice = 0;
    try
    {
        const potion = await getItemByName(name);
        req.session.data = [];
        const ingredients =  setIngredients(potion,display);
        
        for(const ingredient of ingredients)
        {
            const ingredientData = await getItemByName(ingredient.item);
            const image = setImage(ingredientData,untradeableItems);
            const exactPrice = ingredientData.dailyPrice;
            const totalPrice = exactPrice*number;
            const coinPile = getCoinPile(totalPrice);
            ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
            req.session.data.push(ingredient);
            console.log(`${ingredient.item} RECIEVED`,`itemID: ${ingredient.itemID}`);
        }
        req.session.finalPrice = finalPrice;
        req.session.displaySetting = display;
        req.session.save();
        res.render("results",{ingredients,finalPrice,"displaySetting":display,pageTitle:"PotionChain"}) 

    }
    catch(e)
    {
        console.log("showResults error",e);
        throw new ExpressError(e,500);
    }
}