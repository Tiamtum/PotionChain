const runescape = require("runescape-api");
const grandexchange = runescape.grandexchange;
const HerbloreItem = require("../model/herbloreitem");

async function getItemByName(name)
{
    try
    {
        return await HerbloreItem.findOne({name:name})
    }
    catch(e){console.log(`getItemByName error with ${name}`);}
}

function getIngredients(data,tab=0,itemAndTab=[])
{
    if(data.requires.length===0)
    {
        const item = data.name;
        const itemID = data.itemID;
        itemAndTab.push({item,itemID,tab})
        tab++;
    }
    else
    {
        const item = data.name;
        const itemID = data.itemID;
        itemAndTab.push({item,itemID, tab});
        for(const ingredient of data.requires)
        {
            getIngredients(ingredient,tab+1,itemAndTab)
        }
        return itemAndTab;
    }
}

async function getItemInfo(itemID)
{
    console.log("getItemInfo itemID:",itemID);
    try
    {
        return await grandexchange.getItemGraph(parseInt(itemID))   
    }
    catch(e){
        console.log(`getItemInfo error with itemID=${itemID}: `,e);
    }    
}

function getCoinPile(totalPrice)
{
    if(totalPrice===1){return "/images/Coins_1.webp";}
    else if(totalPrice===2){return "/images/Coins_2.webp";}
    else if(totalPrice===3){return "/images/Coins_3.webp";}
    else if(totalPrice===4){return "/images/Coins_4.webp";}
    else if(totalPrice>=5 && totalPrice<25){return "/images/Coins_5.webp";}
    else if(totalPrice>=25 && totalPrice<100){return "/images/Coins_25.webp";}
    else if(totalPrice>=100 && totalPrice<250){return "/images/Coins_100.webp";}
    else if(totalPrice>=250 && totalPrice<1000){return "/images/Coins_250.webp";}
    else if(totalPrice>=1000 && totalPrice<10000){return "/images/Coins_1000.webp";}
    else{return "/images/Coins_10000.webp";}
}

async function parseItemInfo(itemInfo,number)
{
    try{
        const exactPrice = itemInfo.daily[Object.keys(itemInfo.daily)[Object.keys(itemInfo.daily).length-1]] //access the value of the last key in daily
        const totalPrice = exactPrice*number;
        const coinPile = getCoinPile(totalPrice);
        console.log(exactPrice,totalPrice,coinPile)
        return [exactPrice,totalPrice,coinPile];
    }
    catch(e){
        console.log(`parseItemInfo error with itemInfo:${itemInfo}, number:${number}`)

    }
}

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
    "900009": "Elder overload potion (6)",
    "900010": "Antifire (1)",
    "900012": "Antifire (3)",
    "900013": "Antifire (4)",
    "900014": "Super antifire (1)",
    "900015": "Super antifire (3)",
    "900016": "Super antifire (4)",
    "900017": "Elder overload salve (6)",
    "900018": "Phoenix feather"

}

const getDuplicate = async (name,number) => {
    try
    {   
        console.log(name);
        await new Promise(resolve => setTimeout(resolve, 1500))
        let duplicateData = [];
        const duplicate = await getItemByName(name);
        duplicateData.push(duplicate.image);
        const duplicateInfo = await getItemInfo(duplicate.itemID);
        duplicateData.push(...await parseItemInfo(duplicateInfo,number));
        
        console.log("duplicate, ",duplicate)
        console.log("duplicateData, ",duplicateData);
        

        console.log(`${duplicate.name} RECIEVED in getDuplicate`,`itemID: ${duplicate.itemID}`);
        return duplicateData;

    }
    catch(e){console.log(`getDuplicate error with ${name},${number}: `, e)}
}

const manageRepitions = async (potion,name,number,ingredients) =>{
    try
    {
        const duplicates = {}
        if(name === "Overload (3)")
        {      
            const vial = await getDuplicate("Vial");
            const vialOfWater = await getDuplicate("Vial of water")
            console.log(vial);
            duplicates["Vial"] = vial;
            duplicates["Vial of water"] = vialOfWater;  
        }
        if(name === "Supreme overload potion (6)" || name === "Elder overload potion (6)" || name === "Elder overload salve (6)")
        {
            const vial = await getDuplicate("Vial",number);
            const vialOfWater = await getDuplicate("Vial of water",number);
            duplicates["Vial"] = vial;
            duplicates["Vial of water"] = vialOfWater;  
            const repeatedIngredients = []
            const superAttackIngredients = getIngredients(await getItemByName("Super attack (3)"));
            const superStrengthIngredients = getIngredients(await getItemByName("Super strength (3)"));
            const superDefenceIngredients = getIngredients(await getItemByName("Super defence (3)"));
            const superRangingPotionIngredients = getIngredients(await getItemByName("Super ranging potion (3)"));
            const superMagicPotionIngredients = getIngredients(await getItemByName("Super magic potion (3)"));
            repeatedIngredients.push(superAttackIngredients,superStrengthIngredients,superDefenceIngredients,superRangingPotionIngredients,superMagicPotionIngredients);
            const flattened = repeatedIngredients.flat().filter(ingredient => ingredient.item !== "Vial" && ingredient.item !== "Vial of water");
            console.log("flattened",flattened);
            for(const ingredient of flattened)
            {
                // console.log(ingredient);
                const item = await getDuplicate(ingredient.item,number);
                duplicates[ingredient.item] = item;
            }
        }
        return duplicates;
    }
    catch(e){console.log(`getDuplicate error with ${name},${number}: `, e)}
}

const pushDuplicate = (duplicates,number,ingredient,sessionData) =>
{
    const [image,exactPrice,totalPrice,coinPile] = duplicates[ingredient.item];
    ingredient.data = {number,image,exactPrice,totalPrice,coinPile};
    sessionData.push(ingredient);
    console.log(`pushing ${ingredient.item} from duplicates...`);  
}


module.exports = {getItemByName,
    getIngredients,
    getItemInfo,
    getCoinPile,
    parseItemInfo,
    untradeableItems,
    manageRepitions,
    pushDuplicate,
};