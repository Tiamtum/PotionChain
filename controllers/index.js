const ExpressError = require("../utils/ExpressError");
const {getItemByName,
    getIngredients,
    getItemInfo,
    parseItemInfo,
    manageRepitions,
    pushDuplicate,
    untradeableItems} = require("../utils/potionDataHelpers");

module.exports.renderIndex = async (req,res)=>{
    console.log("renderIndex Called")
    console.log(req.session);
    res.render("index",{pageTitle:"PotionChain"}) ;
}

module.exports.fetchData = (req,res) =>{
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
    console.log(req.query);
    const name = req.query.name;
    const number = parseInt(req.query.number);
    const display = req.query.display;
    try
    {
        const potion = await getItemByName(name);
        let finalPrice = 0;
        req.session.data = []
        if(display === "full")
        {
            const ingredients = getIngredients(potion);
            const duplicates = await manageRepitions(potion,name,number,ingredients);                 
            for(const ingredient of ingredients)
            {
                if(!untradeableItems[ingredient.itemID])
                {
                        const ingredientName = ingredient.item;
                        if(duplicates[ingredientName])
                        {
                            pushDuplicate(duplicates,number,ingredient,req.session.data);
                            continue;
                        }
                        else
                        {
                            await new Promise(resolve => setTimeout(resolve, 1500)) //buffer requests, otherwise will fail
                            const itemInfo = await getItemInfo(ingredient.itemID);
                            const data = await parseItemInfo(itemInfo,number);
                            const [image,exactPrice,totalPrice,coinPile] = data
                            if(ingredient.item != name)
                            {
                                finalPrice+=totalPrice;
                            }
                            ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
                            req.session.data.push(ingredient);
                            console.log(`${ingredient.item} RECIEVED`,`itemID: ${ingredient.itemID}`);
                           
                        }
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
            req.session.displaySetting = display;
            req.session.save();
            res.render("results",{ingredients,finalPrice,"displaySetting":display,pageTitle:"PotionChain"})
        }
        else if(display === "essential")
        {
            const ingredients = getIngredients(potion).filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
            console.log(ingredients);
            for(const ingredient of ingredients)
            {            
                    if(!untradeableItems[ingredient.itemID])
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
                        console.log(`${ingredient.item} RECIEVED`,`itemID: ${ingredient.itemID}`);
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
            console.log(ingredients);
            req.session.finalPrice = finalPrice;
            req.session.displaySetting = display;
            req.session.save();
            res.render("results",{ingredients,finalPrice,"displaySetting":display,pageTitle:"PotionChain"})
        }
        else
        {
            throw new ExpressError("Invalid display option.", 400);
        }
    }
    catch(e)
    {
        console.log("showResults error",e);
        throw new ExpressError(e,500);
    }  
}