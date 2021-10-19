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
    shortHandNames,
    getCoinPile,
    parseName,
    parsePrice,
    getFinalPrice,
} = require("../utils/potionDataHelpers");

module.exports.renderIndex = async (req,res)=>{
    console.log("renderIndex Called")
    console.log(req.session);
    res.render("index",{pageTitle:"Potion Chain"});
}

module.exports.renderChangelog = (req,res)=>{
    res.render("changelog",{pageTitle:"Potion Chain"})
}

module.exports.showResults = async (req,res)=>{  
    console.log("req.query", req.query);
    try
    {
        const name = await parseName(req.query.name.trim());
        const number = parseInt(req.query.number);
        const display = req.query.display;
        const potion = await getItemByName(name);
        req.session.data = [];
        const ingredients =  setIngredients(potion,display);
        
        for(const ingredient of ingredients)
        {
            const ingredientData = await getItemByName(ingredient.item);
            const image = setImage(ingredientData,untradeableItems);
            const exactPrice = ingredientData.dailyPrice;
            // const totalPrice = exactPrice*number;
            // const totalPriceParsed = parsePrice(totalPrice);
            const totalPrice = {"value":exactPrice*number,"string":parsePrice(exactPrice*number)}
            const coinPile = getCoinPile(totalPrice.value);
            ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
            req.session.data.push(ingredient);
            console.log(`${ingredient.item} RECIEVED`,`itemID: ${ingredient.itemID}`);
        }
        
        
        // const finalPrice = getFinalPrice(ingredients,display);
        // console.log("finalPrice",finalPrice);
        let totals = 0 ;
        for(let i = 1; i<ingredients.length; i++)
        {
            totals += ingredients[i].data.totalPrice.value 
        }
        // const cost = ingredients[0].data.totalPrice.value - totals;
        // const priceToMake = {"value":totals,"string":parsePrice(totals),"coinPile":getCoinPile(totals)}
        // const profit = {"value":cost, "string":parsePrice(cost),"coinPile":getCoinPile(cost)};

        const costData = 
        {
            "profit" : {"value":ingredients[0].data.totalPrice.value - totals, "string":parsePrice(ingredients[0].data.totalPrice.value - totals),"coinPile":getCoinPile(ingredients[0].data.totalPrice.value - totals)},
            "priceToMake" : {"value":totals,"string":parsePrice(totals),"coinPile":getCoinPile(totals)}
        }

        // req.session.profit = profit;
        // req.session.finalPrice = finalPrice;
        req.session.costData = costData;
        req.session.displaySetting = display;
        req.session.save();
        console.log(ingredients);
        res.render("results",{ingredients,costData,"displaySetting":display,pageTitle:"Potion Chain"}) 

    }
    catch(err)
    {
        const name = req.query.name;
        console.log("showResults error",err);
        console.log("err.name, ",err.name,typeof(err.name));
        console.log("err.message, ",err.message,typeof(err.message));
        console.log("err.name === \"TypeError\"", err.name === "TypeError");
        if(err.name === "TypeError")
        {
            throw new ExpressError(`Potion not found: ${name} - check your spelling or copy and paste the potion name from the Supported Potions menu. Otherwise, the potion you have requested may not be supported yet.`,404)
        }
        else
        {
            throw new ExpressError(err,500);
        }
    }
}