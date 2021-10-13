const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/PotionChain"
const HerbloreItem = require("../model/herbloreitem");
const {getItemInfo} = require("../utils/potionDataHelpers");
const runescape = require("runescape-api");
const grandexchange = runescape.grandexchange;

const untradeableItems = [
    12158,
    12159,
    12160,
    12163,
    1525,
    1526,
    1526,
    1533,
    1534,
    5004,
    19972,
    19973,
    19974,
    19975,
    19976,
    19977,
    19978,
    19979,
    19980,
    19981,
    19982,
    19983,
    19984,
    19985,
    19986,
    19987,
    19988,
    19989,
    19990,
    19991,
    19992,
    19993,
    19972,
    19973,
    19975,
    19976,
    19977,
    19979,
    19980,
    19981,
    19982,
    19983,
    19984,
    19985,
    19986,
    19987,
    19988,
    19989,
    19990,
    19991,
    19992,
    19993,
    19998,
    19999,
    20000,
    20001,
    20002,
    49123,
    899995,
    899996,
    899997,
    899998,
    899999,
    900000,
    900001,
    900002,
    900003,
    900004,
    900005,
    900006,
    900007,
    900008,
    900009,
    900010,
    900012,
    900013,
    900014,
    900015,
    900016,
    900017,
    900018
]

mongoose.connect(dbUrl)
    .then(()=>{
        console.log(`[Mongoose | SUCCESS] - Connection Open @ ${dbUrl}`);
    })
    .catch((e)=>{
        console.log(`[Mongoose | ERROR] - ${e}`);
    })


async function fetchPrices()
{
    
    const herbloreItems = await HerbloreItem.find({});
    for(const item of herbloreItems)
    {
        try{
            if(!untradeableItems.find(id => id === item.itemID) && item.dailyPrice === 0)
            {
                console.log(item.name);
                await new Promise(resolve => setTimeout(resolve, 2500)) 
                const graph = await grandexchange.getItemGraph(parseInt(item.itemID));
                const exactPrice = graph.daily[Object.keys(graph.daily)[Object.keys(graph.daily).length-1]]
                console.log(exactPrice)
                await HerbloreItem.updateOne({name:item.name},{$set:{dailyPrice:exactPrice}});
                await item.save();    
            }

        }
        catch(e){
            console.log(`failed to get price for ${item.name}`,e)
        }
    }
    console.log("finished");


}

fetchPrices();