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
    getCoinPile
} = require("../utils/potionDataHelpers");

module.exports.renderIndex = async (req,res)=>{
    console.log("renderIndex Called")
    console.log(req.session);
    res.render("index",{pageTitle:"Potion Chain"});
}

module.exports.renderChangelog = (req,res)=>{
    res.render("changelog",{pageTitle:"Potion Chain"})
}

async function parseName(rawName)
{
    const lowercaseName = rawName.toLowerCase().trim().replace(/\s+/g, " ");
    console.log(lowercaseName);
    if(shortHandNames[lowercaseName])
    {
        return shortHandNames[lowercaseName]
    }
    else
    {
        return rawName.trim().replace(/\s+/g, " ");
    };
    
}

module.exports.showResults = async (req,res)=>{  
    console.log("req.query", req.query);
    try
    {
        const name = await parseName(req.query.name.trim());
        const number = parseInt(req.query.number);
        const display = req.query.display;
        let finalPrice = 0;
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
        res.render("results",{ingredients,finalPrice,"displaySetting":display,pageTitle:"Potion Chain"}) 

    }
    catch(err)
    {
        const name = req.query.name;
        console.log("showResults error",err);
        console.log("e.name, ",err.name,typeof(err.name));
        console.log("e.message, ",err.message,typeof(err.message));
        console.log("err.name === \"TypeError\"", err.name === "TypeError");
        if(err.name === "TypeError")
        {
            throw new ExpressError(`Potion not found: ${name} - check your spelling or copy and paste the potion name from the Supported Potions menu. Otherwise, the potion you have requested may not be supported yet.`,404)
        }
        else
        {
            throw new ExpressError(e,500);
        }
    }
}