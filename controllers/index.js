const ExpressError = require("../utils/ExpressError");
const getItemInfo = require("../utils/getItemInfo");
const getIngredients = require("../utils/getIngredients");
const HerbloreItem = require("../model/herbloreitem");

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


const getItemByName = async(name)=>{
    return await HerbloreItem.findOne({name:name})
}
const parseItemInfo = async(itemInfo,number)=>
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
// const setSessionAndRender = async(name,number,data,session,res)=>
// {
//     const [image,exactPrice,totalPrice,coinPile] = data;
//     session.data = {name, number, image, exactPrice, totalPrice, coinPile};
//     session.save();
//     res.render("results",{name, number, image, exactPrice, totalPrice, coinPile, pageTitle:"PotionChain"})
// }

//TODO:
//convert the then-catch chain into async-await 
//integrate the test page functionality into the showResults route
module.exports.showResults = async (req,res)=>{  
    const name = req.query.name;
    const number = parseInt(req.query.number);
    try
    {
        const potion = await getItemByName(name);
        //getIngredients, getItemInfo over each ingredient
        console.log(getIngredients(potion));
        const itemInfo = await getItemInfo(potion.itemID);
        const data = await parseItemInfo(itemInfo,number);   
        // await setSessionAndRender(name,number,data,req.session,res);
        
        const [image,exactPrice,totalPrice,coinPile] = data; //put this data onto each item of the getIngredients array
        req.session.data = {name, number, image, exactPrice, totalPrice, coinPile};
        req.session.save();
        res.render("results",{name, number, image, exactPrice, totalPrice, coinPile, pageTitle:"PotionChain"})
    }
    catch(e)
    {
        console.log("showResults error",e);
        throw new ExpressError(e,500);
    }
}

module.exports.renderTest = async (req,res)=>{
    const extremeAttack = await HerbloreItem.findOne({name:"Super attack (3)"});
    const itemAndTab = getIngredients(extremeAttack);
    res.render("test",{extremeAttack,itemAndTab,pageTitle:"Testing Grounds"});
}


