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

function getIngredients(data)
{
    if(data.requires.length===0)
    {
        console.log(data.name)
    }
    else
    {
        console.log(data.name);
        for(const item of data.requires)
        {
            getIngredients(item)
        }
    }
/*
This prints out: 

    Extreme attack (3)
    Super attack (3)
    Irit potion (unf)
    Clean irit
    Grimy irit
    Vial of water
    Vial
    Eye of newt
    Clean avantoe
    Grimy avantoe

What I need is someway to return these names such that I can produce:

    Extreme attack (3)
        Super attack (3)
            Irit potion (unf)
                Clean irit
                    Grimy irit
                Vial of water
                    Vial
            Eye of newt
        Clean avantoe
            Grimy avantoe
            
In the EJS. I.e., I need to include information that says when to tab and when not to tab.    
Maybe return [Super attack (3),[Irit potion (unf), [Clean irit,[Grimy irit],Vial of water,[Vial]],Eye of newt], Clean avantoe,[Grimy avantoe]] ?
Or: [{Super attack (3), tab:1},{Irit potion (unf),tab:2},{Clean Irit,tab:3},{Grimy irit,tab:4},{Vial of water,tab:3},{Vial,tab:4},{Eye of newt,tab:2},{Clean avantoe,tab:1},{Grimy avantoe,tab:2}]?
I think the object approach might work based experiements with nested arrays not yielding good results.
*/

}

module.exports.renderTest = async (req,res)=>{
    const extremeAttack = await HerbloreItem.findOne({name:"Extreme attack (3)"});
    // getIngredients(extremeAttack);
    // const data1 = ["Super attack (3)",["Irit potion (unf)", ["Clean irit",["Grimy irit"],"Vial of water",["Vial"]],"Eye of newt"], "Clean avantoe",["Grimy avantoe"]]
    // const dataString = JSON.stringify(data1).trim();
    const data2 = 
    [
        {"Super attack (3)":"Super attack (3)", tab:1},
        {"Irit potion (unf)":"Irit potion (unf)",tab:2},
        {"Clean Irit":"Clean Irit",tab:3},
        {"Grimy irit":"Grimy irit",tab:4},
        {"Vial of water":"Vial of water",tab:3},
        {"Vial":"Vial",tab:4},
        {"Eye of newt":"Eye of newt",tab:2},
        {"Clean avantoe":"Clean avantoe",tab:1},
        {"Grimy avantoe":"Grimy avantoe",tab:2}
    ]
    res.render("test",{extremeAttack,data2,pageTitle:"Testing Grounds"});
}