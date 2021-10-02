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
    try{
    return Promise.all(
        [
            await grandexchange.getItem(parseInt(itemID)),
            await grandexchange.getItemGraph(parseInt(itemID))
        ]
    )
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
        const image = itemInfo[0].icons.default
        //exactPrice fails sometimes on account of the daily key being undefined for some unknown reason
        if(itemInfo[1].daily[Object.keys(itemInfo[1].daily)[Object.keys(itemInfo[1].daily).length-1]]===undefined)
        {
            const exactPrice = NaN;
            const totalPrice = NaN;
            const coinPile = getCoinPile(1);
            return [image,exactPrice,totalPrice,coinPile];
        }
        else
        {
            const exactPrice = itemInfo[1].daily[Object.keys(itemInfo[1].daily)[Object.keys(itemInfo[1].daily).length-1]] //access the value of the last key in daily
            const totalPrice = exactPrice*number;
            const coinPile = getCoinPile(totalPrice);
            return [image,exactPrice,totalPrice,coinPile];
        }
    }
    catch(e){
        console.log(`parseItemInfo error with itemInfo:${itemInfo}, number:${number}`)
        const errorImage = "/images/error.png";
        const errorPrice = 0;
        return [errorImage,errorPrice,errorPrice,errorImage];
    }
}

module.exports = {getItemByName,getIngredients,getItemInfo,getCoinPile,parseItemInfo};