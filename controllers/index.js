const runescape = require("runescape-api");
const grandexchange = runescape.grandexchange;
const fs = require("fs");
const fsPromises = fs.promises;
const itemIDs = require("../itemIDs.json");


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


//Need to parse values above 9,999 differently.
//e.g.: 10.5k, 11.3m, 2.1b

async function getItemID(name)
{
    console.log("getItemID called");    
    // fs.readFile("itemIDs",(err,data)=>{
    //         for(ID in itemIDs)
    //         {
    //             if(itemIDs[ID]===name)
    //             {
    //                 console.log(`ID found: ${ID}`);
    //                 return parseInt(ID);
    //             }
    //         }
    //     })
    try {
        return await fsPromises.readFile('./itemIDs.json');
      } catch (err) {
        console.error('Error occured while reading directory!', err);
      }

}

async function getItemDetails(itemID) //can get examine details later if needed
{
    await grandexchange.getItem(parseInt(itemID)).then(data => {       
        return data.icons.default;
    })   
}

async function getExactPrice(itemID)
{
    await grandexchange.getItemGraph(parseInt(itemID)).then(data => {
        // console.log(`==============graph entered:`)
        return parseInt(data.daily[Object.keys(data.daily)[Object.keys(data.daily).length-1]])
        // return data.daily;
        
    })    
}




async function accumulateData(name)
{
    // await getItemID(name).then(itemID=>{
    //     console.log(`itemID: ${itemID}`);
    //     return Promise.all([
    //         getItemDetails(itemID),
    //         getExactPrice(itemID)
    //     ])
    // })
    // const itemID = await getItemID(name);
    // console.log(itemID);
    // return Promise.all([await getItemID(name)])
}

module.exports.showResults = async (req,res)=>{  
    // console.log("=showResults called");
    // console.log("======START======")
    // console.log(res.locals);
    // console.log(res.locals.data);
    // req.session.data = "hello";
    // console.log(req.query);
    // console.log("=================")
    //const name = req.query.name;
    // async function findIDQueryAndRender(name)
    // {
    //     // console.log(`==findIDQueryAndRender called, name:${name}`);
    //     try{
    //         await fs.readFile("itemIDs",(err,data)=>{
    //             // console.log("===readFile entered")
    //             for(ID in itemIDs)
    //             {
    //                 // console.log(`for loop entered: ID:${ID}, itemIDs[ID]:${itemIDs[ID]}`);
    //                 if(itemIDs[ID]===name)
    //                 {
                        
                            // await accumulateData(name).then(data=>{
                            //     console.log("data:")
                            //     console.log(data);
                            //     res.send("hello");
                            // });

                            getItemID("Super attack (3)").then(data=>console.log(data));
                            res.send("hello")

                        


    //                     // const itemID = parseInt(ID);
    //                     // // console.log("====ID found");
    //                     // let number, image, coinPile, exactPrice,totalPrice;
    //                     // number = req.query.number
    //                     // getItemDetails(itemID)
    //                     //     .then(img=>{
    //                     //         image = img;
    //                     //     })
    //                     //     .then(getExactPrice(itemID)
    //                     //         .then(extPrice=>{
    //                     //             exactPrice = extPrice;
    //                     //             totalPrice = number * exactPrice;
    //                     //             if(totalPrice===1){coinPile="/images/Coins_1.webp";}
    //                     //             else if(totalPrice===2){coinPile="/images/Coins_2.webp";}
    //                     //             else if(totalPrice===3){coinPile="/images/Coins_3.webp";}
    //                     //             else if(totalPrice===4){coinPile="/images/Coins_4.webp";}
    //                     //             else if(totalPrice>=5 && totalPrice<25){coinPile="/images/Coins_5.webp";}
    //                     //             else if(totalPrice>=25 && totalPrice<100){coinPile="/images/Coins_25.webp";}
    //                     //             else if(totalPrice>=100 && totalPrice<250){coinPile="/images/Coins_100.webp";}
    //                     //             else if(totalPrice>=250 && totalPrice<1000){coinPile="/images/Coins_250.webp";}
    //                     //             else if(totalPrice>=1000 && totalPrice<10000){coinPile="/images/Coins_1000.webp";}
    //                     //             else{coinPile="/images/Coins_10000.webp";}
    //                     //             console.log(number, image, coinPile, exactPrice,totalPrice)
    //                     //         }).catch(e=>console.log("getExactPrice Failure",e))
    //                     //         req.session.data = {number, image, coinPile, exactPrice,totalPrice};
    //                     //         req.session.save();
    //                     //         res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})
    //                     //     }).catch(e=>console.log("getItemDetails Failure",e))
    //                     // break;
                        
    //                     // grandexchange.getItem(parseInt(ID)).then(data => {
    //                     //     // console.log("=====grandexchange entered")
    //                     //     image = data.icons.default;
    //                     //     // exactPrice = getExactPrice(ID);
    //                     //     getExactPrice(ID)
    //                     //         .then(priceData =>{
    //                     //             //console.log(priceData);
    //                     //             exactPrice = priceData;
    //                     //             totalPrice = parseInt(number) * parseInt(exactPrice);
    //                     //             if(totalPrice===1){coinPile="/images/Coins_1.webp";}
    //                     //             else if(totalPrice===2){coinPile="/images/Coins_2.webp";}
    //                     //             else if(totalPrice===3){coinPile="/images/Coins_3.webp";}
    //                     //             else if(totalPrice===4){coinPile="/images/Coins_4.webp";}
    //                     //             else if(totalPrice>=5 && totalPrice<25){coinPile="/images/Coins_5.webp";}
    //                     //             else if(totalPrice>=25 && totalPrice<100){coinPile="/images/Coins_25.webp";}
    //                     //             else if(totalPrice>=100 && totalPrice<250){coinPile="/images/Coins_100.webp";}
    //                     //             else if(totalPrice>=250 && totalPrice<1000){coinPile="/images/Coins_250.webp";}
    //                     //             else if(totalPrice>=1000 && totalPrice<10000){coinPile="/images/Coins_1000.webp";}
    //                     //             else{coinPile="/images/Coins_10000.webp";}
    //                     //             // console.log(`image:${image}`);
    //                     //             // console.log(`currentPrice:${currentPrice}`);
    //                     //             // console.log(`coinPile:${coinPile}`);
    //                     //             req.session.data = {number, image, coinPile, exactPrice,totalPrice};
    //                     //             // console.log(req.session);
    //                     //             req.session.save();
    //                     //             res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})
    //                     //         })


    //                         // totalPrice = parseInt(number) * parseInt(exactPrice);

    //                         // if(totalPrice===1){coinPile="/images/Coins_1.webp";}
    //                         // else if(totalPrice===2){coinPile="/images/Coins_2.webp";}
    //                         // else if(totalPrice===3){coinPile="/images/Coins_3.webp";}
    //                         // else if(totalPrice===4){coinPile="/images/Coins_4.webp";}
    //                         // else if(totalPrice>=5 && totalPrice<25){coinPile="/images/Coins_5.webp";}
    //                         // else if(totalPrice>=25 && totalPrice<100){coinPile="/images/Coins_25.webp";}
    //                         // else if(totalPrice>=100 && totalPrice<250){coinPile="/images/Coins_100.webp";}
    //                         // else if(totalPrice>=250 && totalPrice<1000){coinPile="/images/Coins_250.webp";}
    //                         // else if(totalPrice>=1000 && totalPrice<10000){coinPile="/images/Coins_1000.webp";}
    //                         // else{coinPile="/images/Coins_10000.webp";}
    //                         // // console.log(`image:${image}`);
    //                         // // console.log(`currentPrice:${currentPrice}`);
    //                         // // console.log(`coinPile:${coinPile}`);

    //                         // req.session.data = {number, image, coinPile, exactPrice,totalPrice};
    //                         // console.log(req.session);
    //                         // req.session.save();
    //                         // res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})

    //                     // })
                        
    //                     // break;
    //                 }
    //             }
    //             // res.send("item not found, check spelling");                    
    //         })
    //     }catch(e){
    //         console.log("test failure:",e);
    //     }
    // }




//optimizer code WORKS GOOD

    // if(Object.keys(req.session).find(key => key==="data")===undefined)
    // {
    //     await findIDQueryAndRender(req.query.name);
    // }
    // else
    // {
    //     console.log("ELSE CONDITION, req.session.data exists")
    //     if(req.query.name === req.session.data.name)
    //     {
    //         const {name,image,currentPrice,coinPile} = req.session.data;
    //         let number = req.session.data.number;
    //         let totalPrice = req.session.data.totalPrice;
    //         let exactPrice = req.session.data.exactPrice;
    //         if(req.query.number !== req.session.data.number)
    //         {
    //             // console.log("!!number is different!!")
    //             const commaIndex = currentPrice.indexOf(",");
    //             const currentPriceInt = parseInt(currentPrice.substring(0,commaIndex)+currentPrice.substring(commaIndex+1)); 
    //             number = parseInt(req.query.number);
    //             totalPrice = parseInt(currentPriceInt)*parseInt(number);
    //             exactPrice = parseInt(number) * parseInt(exactPrice)
    //             req.session.data.totalPrice = totalPrice; 
    //             req.session.data.number = number;
    //             req.session.data.exactPrice = exactPrice;
    //             req.session.save();
    //             res.render("results",{name,number,image,currentPrice,coinPile, totalPrice,exactPrice,pageTitle:"PotionChain"})
    //         }
    //         else
    //         {
    //             res.render("results",{name,number,image,currentPrice,coinPile, totalPrice,exactPrice,pageTitle:"PotionChain"})
    //         }
    //     }
    //     else
    //     {
    //         delete req.session.data;
    //         await findIDQueryAndRender(req.query.name);
    //     }     
    // }
    // console.log(req.session);
    
}



