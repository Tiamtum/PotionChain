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

//  const untradeableIDs = [899995,899996,899997,899998,899999,900000,900001,900002,900003,900004,900005]
const untradeableItems = {
    "899995": "Extreme runecrafting (3)",
    "899996": "Extreme invention (3)",
    "899997": "Extreme hunter (3)",
    "899998": "Extreme divination (3)",
    "899999": "Extreme cooking potion (3)",
    "900000": "Extreme attack (3)",
    "900001": "Extreme strength (3) ",
    "900002": "Extreme defence (3) ",
    "900003": "Extreme ranging (3) ",
    "900004": "Extreme magic (3) ",
    "900005": "Overload (3)"
}

module.exports.test = async (req,res)=>{
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
            if(!untradeableItems[ingredient.itemID])
            {
                console.log(`${ingredient.item} RECIEVED`,`itemID: ${ingredient.itemID}`);
                const itemInfo = await getItemInfo(ingredient.itemID);
                // console.log(itemInfo);
                const data = await parseItemInfo(itemInfo,number);
                const [image,exactPrice,totalPrice,coinPile] = data
                if(ingredient.item != name)
                {
                    finalPrice+=totalPrice;
                }
                ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
                req.session.data.push(ingredient);
                console.log(`${ingredient.item} PROCESSED SUCCESSFULLY`);
            }
            else
            {
                const image = `/images/untradables/${ingredient.item}.webp`;
                const exactPrice = 1;
                const totalPrice = 1;
                const coinPile =  "/images/Coins_1000.webp";
                ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
                req.session.data.push(ingredient);
            }
        }
        req.session.finalPrice = finalPrice;
        req.session.save();
        res.render("test",{ingredients,finalPrice,pageTitle:"PotionChain"})
    }
    catch(e)
    {
        console.log("showResults error",e);
        throw new ExpressError(e,500);
    }
    
 

   
    //comment above this and uncomment below this if you mess up and want to try again
    // const name = "Overload (3)";
    // const number = 1;
    // let finalPrice = 0 ;
    // req.session.data = [];
    // const potion = await getItemByName(name);
    // const ingredients = getIngredients(potion);
    // const testNumber = 1
    // const testImage = "/images/untradables/Extreme_attack_(3).webp"
    // const testExactPrice = 1
    // const testTotalPrice = 1 //'tab: 1' ingredient costs will be the price
    // const testCoinPile = "/images/Coins_1000.webp"
    // testData = {number:testNumber,image:testImage,exactPrice:testExactPrice,totalPrice:testTotalPrice,coinPile:testCoinPile};
    // ingredients[0].data = testData;
    // req.session.data.push(ingredients[0]);
    // console.log(ingredients);
    // const outerLoop = 0;
    // res.render("test",{ingredients,outerLoop,pageTitle:"PotionChain"})
   
}
