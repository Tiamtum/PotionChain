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

module.exports.showResults = async (req,res)=>{  
    console.log("=showResults called");
    const name = req.query.name;
    const number = parseInt(req.query.number);
    async function findIDQueryAndRender(name)
    {
        console.log(`==findIDQueryAndRender called, name:${name}`);
        try{
            await fs.readFile("filteredItemIDs",(err,data)=>{
                console.log("===readFile entered")
                for(ID in itemIDs)
                {
                    // console.log(`for loop entered: ID:${ID}, itemIDs[ID]:${itemIDs[ID]}`);
                    if(itemIDs[ID]===name)
                    {
                        const itemID = parseInt(ID);
                        console.log("====ID found");
                        let image, coinPile, exactPrice,totalPrice;
                        grandexchange.getItem(parseInt(itemID)).then(item => {       
                            console.log("====getItem entered")
                            image = item.icons.default;
                            grandexchange.getItemGraph(parseInt(itemID)).then(price => {
                                console.log("=====getItemGraph entered")
                                exactPrice = parseInt(price.daily[Object.keys(price.daily)[Object.keys(price.daily).length-1]])
                                totalPrice = exactPrice*number;
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
                                req.session.data = {name,number, image, coinPile, exactPrice,totalPrice};
                                req.session.save();
                                console.log(req.session);
                                res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})
                            })
                        })
                        break;
                    }
                }
            })
        }catch(e){console.log(e)}
    }
    if(Object.keys(req.session).find(key => key==="data")===undefined)
    {
        await findIDQueryAndRender(name);
    }
    else
    {
        console.log("ELSE CONDITION, req.session.data exists")
        if(name === req.session.data.name && number === req.session.data.number)
        {
            console.log("query.name=session.name && query.name = data.number")
            const {name,number, image, coinPile, exactPrice,totalPrice} = req.session.data;
            res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})
        }
        else if(name === req.session.data.name && number !== req.session.data.number)
        {
            const {name,image,coinPile,exactPrice} = req.session.data;
            const totalPrice = parseInt(exactPrice)*number;
            req.session.data.totalPrice = totalPrice; 
            req.session.data.number = number;
            req.session.save();
            console.log(req.session);
            res.render("results",{name,number,image,coinPile,exactPrice,totalPrice, pageTitle:"PotionChain"})
        }
        else
        {
            console.log("query.name != session.name")
            console.log("deleting req.session.data");
            delete req.session.data;
            console.log(req.session);
            console.log("calling findIDQueryAndRender");
            await findIDQueryAndRender(name);

        }     
    }
    
}



