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
    "1526": "Clean snake weed",
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
    "900005": "Overload (3)",
    "900006": "Overload (1)",
    "900007": "Supreme overload potion (6)",
    "900008": "Overload (4)",

}
//TODO:
//Add (4) dose support
//Add multiple of each ingreident support
//Add different recipies support
//Eliminate redudency in DB queries (e.g. vials/vials of water)

const getDuplicate = async (name,number) => {
        const duplicate = await getItemByName(name);
        const duplicateInfo = await getItemInfo(duplicate.itemID);
        const duplicateData = await parseItemInfo(duplicateInfo,number);
        console.log(`${duplicate.name} RECIEVED in getDuplicate`,`itemID: ${duplicate.itemID}`);
        return duplicateData;
    
}

const checkForRepetition = async (potion,name,number,ingredients) =>{
    
    console.log(ingredients);
    const duplicates = {}
    if(name === "Overload (3)")
    {      
        const vial = await getDuplicate("Vial");
        const vialOfWater = await getDuplicate("Vial of water")
        duplicates["Vial"] = vial;
        duplicates["Vial of water"] = vialOfWater;  
    }
    if(name === "Supreme overload potion (6)")
    {
        const vial = await getDuplicate("Vial",false);
        const vialOfWater = await getDuplicate("Vial of water",number);
        const superAttack = await getDuplicate("Super attack (3)",number);
        const superStrength = await getDuplicate("Super strength (3)",number);      
        const superDefence = await getDuplicate("Super defence (3)",number);      
        const superRangingPotion = await getDuplicate("Super ranging potion (3)",number);      
        const superMagicPotion = await getDuplicate("Super magic potion (3)",number);  
        
        duplicates["Vial"] = vial;
        duplicates["Vial of water"] = vialOfWater;  
        duplicates["Super attack (3)"] = superAttack;
        duplicates["Super strength (3)"] = superStrength;
        duplicates["Super defence (3)"] = superDefence;
        duplicates["Super ranging potion (3)"] = superRangingPotion;
        duplicates["Super magic potion (3)"] = superMagicPotion;

        console.log("contents of const superAttack: ",superAttack);
    }
    return duplicates;
    
}

const pushDuplicate = (duplicates,name,number,ingredient,sessionData) =>
{
    console.log(name);
    const [image,exactPrice,totalPrice,coinPile] = duplicates[name];
    ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
    sessionData.push(ingredient);
    console.log(`pushing ${name} from duplicates...`);  
}

module.exports.test = async (req,res)=>{
    console.log(req.query);
    const name = req.query.name;
    const number = parseInt(req.query.number);
    const display = req.query.display;
    try
    {
        const potion = await getItemByName(name);
        // const ingredients = getIngredients(potion);
        let finalPrice = 0;
        req.session.data = []
        const duplicates = []
        let isSupreme = false;
        if(name==="Supreme overload potion (6)")
        {
            isSupreme = true;
        }
        if(display === "full")
        {
            const ingredients = getIngredients(potion);
            const duplicates = await checkForRepetition(potion,name,number,ingredients);
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in



            for(const ingredient of ingredients)
            {
                if(!untradeableItems[ingredient.itemID])
                {

                        if(ingredient.item === "Vial of water")
                        {
                            await pushDuplicate(duplicates,"Vial of water", number,ingredient,req.session.data);
                            continue;
                        }
                        else if(ingredient.item === "Vial")
                        {
                            await pushDuplicate(duplicates,"Vial", number,ingredient,req.session.data);
                            continue;
                        }
                        //TODO: THIS NEEDS TO PUSH ! ALL ! OF THE INGREDIENTS FOR SUPER [SET] (3) AS WELL
                        else if(isSupreme && ingredient.item === "Super attack (3)")
                        {
                            await pushDuplicate(duplicates,"Super attack (3)", number,ingredient,req.session.data);
                            continue;
                        }
                        else if(isSupreme && ingredient.item === "Super strength (3)")
                        {
                            await pushDuplicate(duplicates,"Super strength (3)", number,ingredient,req.session.data);
                            continue;
                        }
                        else if(isSupreme && ingredient.item === "Super defence (3)")
                        {
                            await pushDuplicate(duplicates,"Super defence (3)", number,ingredient,req.session.data);
                            continue;
                        }
                        else if(isSupreme && ingredient.item === "Super ranging potion (3)")
                        {
                            await pushDuplicate(duplicates,"Super ranging potion (3)", number,ingredient,req.session.data);
                            continue;
                        }
                        else if(isSupreme && ingredient.item === "Super magic potion (3)")
                        {
                            await pushDuplicate(duplicates,"Super magic potion (3)", number,ingredient,req.session.data);
                            continue;
                        }
                        else
                        {
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
            // console.log(ingredients);
            req.session.finalPrice = finalPrice;
            req.session.displaySetting = display;
            req.session.save();
            res.render("test",{ingredients,finalPrice,"displaySetting":display,pageTitle:"PotionChain"})
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
                        // console.log(itemInfo);
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
            res.render("test",{ingredients,finalPrice,"displaySetting":display,pageTitle:"PotionChain"})
        }
        else
        {
            throw new ExpressError("Invalid display option.", 400);
        }
        // console.log("after",ingredients);
        // req.session.finalPrice = finalPrice;
        // req.session.save();
        // res.render("test",{ingredients,finalPrice,pageTitle:"PotionChain"})
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
