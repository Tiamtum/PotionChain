const ExpressError = require("../utils/ExpressError");
const {getItemByName,getIngredients,getItemInfo,parseItemInfo} = require("../utils/potionDataHelpers");

module.exports.renderIndex = (req,res)=>{
    console.log("renderIndex Called")
    console.log(req.session);
    res.render("index",{pageTitle:"PotionChain"}) ;
}

module.exports.createPotion = (req,res) =>{
    console.log("createPotion Called")
    const {name, number} = req.body;
    const queryName = name.replace(" ","+");
    res.redirect(`/results?name=${queryName}&number=${number}`);
}
//TODO:
//The results page final price needs to be changed.
//If you're buying the ingredients from the ge, you will buy EITHER grimy or clean herbs for instance, NOT both.
//Need to give the choice: which stage of the process you want?
//Completely from scratch: i.e. buying vials and grimy herbs? final price is then the price of vials, grimy herbs, and secondary.
//Buying unfinied potions and secondaries? final price is then the price of the (unf) and secondary
//etc...
module.exports.showResults = async (req,res)=>{  
    const name = req.query.name;
    const number = parseInt(req.query.number);
    try
    {
        const potion = await getItemByName(name);
        const ingredients = getIngredients(potion);
        let finalPrice = 0;
        req.session.data = []
        for(const ingredient of ingredients)
        {
            const itemInfo = await getItemInfo(ingredient.itemID);
            const data = await parseItemInfo(itemInfo,number);
            const [image,exactPrice,totalPrice,coinPile] = data
            if(ingredient.item != name)
            {
                finalPrice+=totalPrice;
            }
            ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
            req.session.data.push(ingredient);
        }
        req.session.finalPrice = finalPrice;
        req.session.save();
        res.render("results",{ingredients,finalPrice,pageTitle:"PotionChain"})
    }
    catch(e)
    {
        console.log("showResults error",e);
        throw new ExpressError(e,500);
    }
}

const untradeableIDs = [15308]

module.exports.test = async (req,res)=>{
    const name = "Extreme attack (3)";
    const number = 1;
    let finalPrice = 0 ;
    req.session.data = [];
    const potion = await getItemByName(name);
    const ingredients = getIngredients(potion);
    const testNumber = 1
    const testImage = "/images/untradables/Extreme_attack_(3).webp"
    const testExactPrice = 1
    const testTotalPrice = 1 //'tab: 1' ingredient costs will be the price
    const testCoinPile = "/images/Coins_1000.webp"
    testData = {number:testNumber,image:testImage,exactPrice:testExactPrice,totalPrice:testTotalPrice,coinPile:testCoinPile};
    ingredients[0].data = testData;
    req.session.data.push(ingredients[0]);
    // console.log(ingredients);
    if(untradeableIDs.find(ID => ID===ingredients[0].itemID))
    {
        const tradables = ingredients.slice(1)
        // console.log(tradables);
        for(const ingredient of tradables)
        {
            const itemInfo = await getItemInfo(ingredient.itemID);
            const data = await parseItemInfo(itemInfo,number);
            const [image,exactPrice,totalPrice,coinPile] = data
            if(ingredient.item != name)
            {
                finalPrice+=totalPrice;
            }
            ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
            req.session.data.push(ingredient);
        }

        console.log(ingredients);
        let price = 0;
        for(const ingredient of ingredients)
        {
            if(ingredient.data.tab===1)
            {
                price+=ingredient.data.totalPrice;
            }
        }
        console.log(ingredient)
        ingredients[0].data.totalPrice = price;
        req.session.finalPrice = finalPrice;
        req.session.save();
        res.render("test",{ingredients,finalPrice,pageTitle:"PotionChain"})
    }
    else
    {
        // const itemInfo = await getItemInfo(ingredients[0].itemID);
    }
}
