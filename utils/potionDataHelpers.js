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
    "5004": "Frog spawn",
    "12158": "Gold charm",
    "12159": "Green charm",
    "12160": "Crimson charm",
    "12163": "Blue charm",
    "19972": "Oily vine",
    "19973": "Draconic vine",
    "19974": "Pungent vine",
    "19975": "Plant teeth",
    "19976": "Aquatic vine",
    "19977": "Shadow vine",
    "19978": "Stripped vine",
    "19979": "Corrupt vine",
    "19980": "Marble vine",
    "19981": "Saradomin vine",
    "19982": "Guthix vine",
    "19983": "Zamorak vine",
    "19984": "Grimy erzille",
    "19985": "Grimy argway",
    "19986": "Grimy ugune",
    "19987": "Grimy shengo",
    "19988": "Grimy samaden",
    "19989": "Clean erzille",
    "19990": "Clean argway",
    "19991": "Clean ugune",
    "19992": "Clean shengo",
    "19993": "Clean samaden",
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
    "900018": "Phoenix feather",
    "900019": "Extreme attack (1)",
    "900020": "Extreme strength (1)",
    "900021": "Extreme defence (1)",
    "900022": "Extreme ranging (1)",
    "900023": "Extreme magic (1)",
    "900031": "Adrenaline potion (1)",
    "900024": "Extreme attack (4)",
    "900025": "Extreme strength (4)",
    "900026": "Extreme defence (4)",
    "900027": "Extreme ranging (4)",
    "900028": "Extreme magic (4)",
    "900029": "Adrenaline potion (3)",
    "900030": "Adrenaline potion (4)",
    "900032": "Enhanced replenishment potion",
    "900033": "Adrenaline renewal potion (3)",
    "900034": "Super adrenaline potion (1)",
    "900035": "Super adrenaline potion (3)",
    "900036": "Super adrenaline potion (4)",
    "900037": "Antipoison+ (unf)",
    "900038": "Antipoison++ (unf)",
    "900039": "Weapon poison+ (unf)",
    "900040": "Weapon poison++ (unf)",
    "900041": "Cave nightshade",
    "900041":"Aggroverload (6)",
    "900042":"Brightfire potion (6)",
    "900043":"Extreme battlemage's potion (6)",
    "900044":"Extreme brawler's potion (6)",
    "900045":"Extreme sharpshooter's potion (6)",
    "900046":"Extreme warmaster's potion (6)",
    "900047":"Holy aggroverload (6)",
    "900048":"Holy overload potion (6)",
    "900049":"Overload salve (6)",
    "900050":"Perfect plus potion (6)",
    "900051":"Replenishment potion (6)",
    "900052":"Searing overload potion (6)",
    "900053":"Supreme attack potion (6)",
    "900054":"Supreme defence potion (6)",
    "900055":"Supreme magic potion (6)",
    "900056":"Supreme overload salve (6)",
    "900057":"Supreme ranging potion (6)",
    "900058":"Supreme strength potion (6)",
    "900059":"Wyrmfire potion (6)"

}

const shortHandNames = {
    "sa": "Super attack (3)",
    "supa": "Super attack (3)",
    "supatt": "Super attack (3)",
    "super attack": "Super attack (3)",
    "super attack (3)": "Super attack (3)",
    "ss": "Super strength (3)",
    "sups": "Super strength (3)",
    "supstr": "Super strength (3)",
    "super strength": "Super strength (3)",
    "super strength (3)": "Super strength (3)",
    "sd": "Super defence (3)",
    "supd": "Super defence (3)",
    "supdef": "Super defence (3)",
    "super defence": "Super defence (3)",
    "super defence (3)": "Super defence (3)",
    "sr": "Super ranging potion (3)",
    "supr": "Super ranging potion (3)",
    "suprng": "Super ranging potion (3)",
    "super ranging": "Super ranging potion (3)",
    "super ranging potion (3)": "Super ranging potion (3)",
    "sm": "Super magic potion (3)",
    "supm": "Super magic potion (3)",
    "supmag": "Super magic potion (3)",
    "super magic": "Super magic potion (3)",
    "super magic potion (3)": "Super magic potion (3)",
    "ea":"Extreme attack (3)",
    "exatt":"Extreme attack (3)",
    "exremea":"Extreme attack (3)",
    "extreme attack":"Extreme attack (3)",
    "extreme attack (3)": "Extreme attack (3)",
    "es":"Extreme strength (3)",
    "exstr":"Extreme strength (3)",
    "exremes":"Extreme strength (3)",
    "extreme strength":"Extreme strength (3)",
    "extreme strength (3)": "Extreme strength (3)",
    "ed":"Extreme defence (3)",
    "exdef":"Extreme defence (3)",
    "extremed":"Extreme defence (3)",
    "extreme defence":"Extreme defence (3)",
    "extreme defence (3)": "Extreme defence (3)",
    "er":"Extreme ranging potion (3)",
    "exrng":"Extreme ranging potion (3)",
    "extremer":"Extreme ranging potion (3)",
    "extreme ranging":"Extreme ranging potion (3)",
    "extreme ranging potion (3)":"Extreme ranging potion (3)",
    "em":"Extreme magic potion (3)",
    "exmag":"Extreme magic potion (3)",
    "extremem":"Extreme magic potion (3)",
    "extreme magic":"Extreme magic potion (3)",
    "extreme magic potion (3)":"Extreme magic potion (3)",
    "ovl" : "Overload (3)",
    "overload": "Overload (3)", 
    "overload (3)":"Overload (3)",
    "sovl": "Supreme overload potion (6)",
    "supovl" : "Supreme overload potion (6)",
    "supreme ovl" : "Supreme overload potion (6)",
    "supreme overload" : "Supreme overload potion (6)",
    "supreme overload (6)" : "Supreme overload potion (6)",
    "supreme overload potion (6)": "Supreme overload potion (6)",
    "eovl" : "Elder overload potion (6)",
    "elder" : "Elder overload potion (6)",
    "elderovl" : "Elder overload potion (6)",
    "elder ovl" : "Elder overload potion (6)",
    "elder overload" : "Elder overload potion (6)",
    "elder overload (6)" : "Elder overload potion (6)",
    "elder overload potion (6)" : "Elder overload potion (6)",
    "eos":"Elder overload salve (6)",
    "esalve":"Elder overload salve (6)",
    "eldersalve":"Elder overload salve (6)",
    "elder salve":"Elder overload salve (6)",
    "elder overload salve":"Elder overload salve (6)",
    "elder overload salve (6)":"Elder overload salve (6)",
}

module.exports = {
    getItemByName,
    getIngredients,
    setImage,
    setIngredients,
    getCoinPile,
    untradeableItems,
    shortHandNames,
};