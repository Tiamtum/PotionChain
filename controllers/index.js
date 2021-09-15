const fs = require("fs");
const path = require("path");
const ExpressError = require("../utils/ExpressError");
const getItemInfo = require("../utils/getItemInfo");
const mongoose = require("mongoose");
const HerbloreItem = require("../model/herbloreitem");
const ingredient = require("../model/ingredient");

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

module.exports.showResults = async (req,res)=>{  
    const name = req.query.name;
    const number = parseInt(req.query.number);
    const jsonPath = path.join(__dirname,"..","filteredItemIDs.json")
    fs.promises.readFile(jsonPath)
    .then(data=>
        {
            return filteredItemIDs = JSON.parse(data);
        }
    )
    .then(filteredItemIDs=>
        {
            for(ID in filteredItemIDs)
            {
                if(filteredItemIDs[ID]===name)
                {
                     return itemID = ID; 
                }
            }
        }
    )
    .then(itemID=>
        {
            console.log("======api queried======");
            return getItemInfo(itemID);
        }
    )
    .then(itemInfo=>
        {
            const image = itemInfo[0].icons.default
            const exactPrice = itemInfo[1].daily[Object.keys(itemInfo[1].daily)[Object.keys(itemInfo[1].daily).length-1]] //access the value of the last key in daily
            const totalPrice = exactPrice*number;
            let coinPile;
            if(totalPrice===1){coinPile="/images/Coins_1.webp";}
            else if(totalPrice===2){coinPile="/images/Coins_2.webp";}
            else if(totalPrice===3){coinPile="/images/Coins_3.webp";}
            else if(totalPrice===4){coinPile="/images/Coins_4.webp";}
            else if(totalPrice>=5 && totalPrice<25){coinPile="/images/Coins_5.webp";}
            else if(totalPrice>=25 && totalPrice<100){coinPile="/images/Coins_25.webp";}
            else if(totalPrice>=100 && totalPrice<250){coinPile="/images/Coins_100.webp";}
            else if(totalPrice>=250 && totalPrice<1000){coinPile="/images/Coins_250.webp";}
            else if(totalPrice>=1000 && totalPrice<10000){coinPile="/images/Coins_1000.webp";}
            else{coinPile="/images/Coins_10000.webp";}
            return [image,exactPrice,totalPrice,coinPile];
        }    
    )
    .then(frontEndData=>
        {
            const [image,exactPrice,totalPrice,coinPile] = frontEndData;
            req.session.data = {name, number, image, exactPrice, totalPrice, coinPile};
            req.session.save();
            res.render("results",{name, number, image, exactPrice, totalPrice, coinPile, pageTitle:"PotionChain"})
        }
    )
    .catch(error=>
        {
            //should be handled with ExpressError instead
            const statusCode=500;
            res.status(statusCode).render("error",{error,statusCode,pageTitle:"Error"});
        }
    )    
}

function getIngredients(data,tab=0,itemAndTab=[])
{
    if(data.requires.length===0)
    {
        const item = data.name;
        itemAndTab.push({item,tab})
        tab++;
    }
    else
    {
        const item = data.name;
        itemAndTab.push({item,tab})
        for(const ingredient of data.requires)
        {
            getIngredients(ingredient,tab+1,itemAndTab)
        }
        return itemAndTab;
    }
}

module.exports.renderTest = async (req,res)=>{
    const extremeAttack = await HerbloreItem.findOne({name:"Extreme attack (3)"});
    const itemAndTab = getIngredients(extremeAttack);
    res.render("test",{extremeAttack,itemAndTab,pageTitle:"Testing Grounds"});
}