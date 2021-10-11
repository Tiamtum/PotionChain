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

function setImage(ingredientData,untradeableItems)
{
    if(!untradeableItems[ingredientData.itemID])
    {
        return ingredientData.image;
    }
    else
    {
        return `/images/untradables/${ingredientData.name}.webp`;
    }
}

function setIngredients(potion,display)
{
    if(display === "full")
    {
        return getIngredients(potion);
    }
    else if(display === "essential")
    {
        return getIngredients(potion).filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
    }
    else
    {
        throw new ExpressError("Invalid display option.", 400);
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

module.exports = {
    getItemByName,
    getIngredients,
    setImage,
    setIngredients,
    getCoinPile,
    untradeableItems,
};