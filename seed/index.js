const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/PotionChain"
const HerbloreItem = require("../model/herbloreitem");
const {primitiveIngredients,nonPrimitiveIngredients,imageLinks} = require("./data.js")

mongoose.connect(dbUrl)
    .then(()=>{
        console.log(`[Mongoose | SUCCESS] - Connection Open @ ${dbUrl}`);
    })
    .catch((e)=>{
        console.log(`[Mongoose | ERROR] - ${e}`);
    })



const linkIDs = {}
for(const link of imageLinks)
{
    linkIDs[link.slice(link.indexOf("?")+4)] = link;
}

// console.log(linkIDs)


const seedDB = async ()=>{
    try{
        await HerbloreItem.deleteMany({});
        for(const itemID in primitiveIngredients)
        {
            if(linkIDs[itemID])
            {
                const primitiveIngredient = new HerbloreItem({
                    name:primitiveIngredients[itemID],
                    itemID: itemID,
                    requires:[],
                    image: linkIDs[itemID],
                    dailyPrice: 0
                })  
                await primitiveIngredient.save();  
            }
            else
            {
                const primitiveIngredient = new HerbloreItem({
                    name:primitiveIngredients[itemID],
                    itemID: itemID,
                    requires:[],
                    image: "null",
                    dailyPrice: 0
                })  
                await primitiveIngredient.save();                  
            }
   
        }
        for(const itemID in nonPrimitiveIngredients)
        {
            if(linkIDs[itemID])
            {
                const nonPrimitiveIngredient = new HerbloreItem({
                    name:nonPrimitiveIngredients[itemID],
                    itemID: itemID,
                    requires:[],
                    image: linkIDs[itemID],
                    dailyPrice: 0
                })  
                await nonPrimitiveIngredient.save();                    
            }
            else
            {
                const nonPrimitiveIngredient = new HerbloreItem({
                    name:nonPrimitiveIngredients[itemID],
                    itemID: itemID,
                    requires:[],
                    image: "null",
                    dailyPrice: 0
                })  
                await nonPrimitiveIngredient.save();                      
            }
        }
    }catch(e){
        console.log("seedPrimitives failed: ",e);
    }
}

const addRequires = async (potion,requires) =>
{
    try{
        const items = []
        for(const material of requires)
        {
            const item = await HerbloreItem.findOne({name:material}); 
            items.push(item._id);
        }
        for(const item of items)
        {
            await HerbloreItem.findOneAndUpdate({name:potion},{$push:{requires:item}});
        }
        console.log(potion,"added");
    }
    catch(e)
    {
        console.log(`Failure at: potion: ${potion}, requires:${requires} \n`,e);
    }
}
//TODO:
//Handle multiple of each ingredient if needed
//Handle untradable images
//Handle alternative recipies 

const addRequiresPromise = async () => {
    await addRequires("Vial of water",["Vial"])
    await addRequires("Juju vial of water",["Juju vial"])
    await addRequires("Bowl of water",["Bowl"])
    await addRequires("Bowl of hot water",["Bowl of water"])
    await addRequires("Toad's legs",["Swamp toad"])
    await addRequires("Unicorn horn dust",["Unicorn horn"])
    await addRequires("Dragon scale dust",["Blue dragon scale"])
    await addRequires("Silver dust",["Silver bar"] )
    await addRequires("Ground mud runes",["Mud rune"])
    await addRequires("Goat horn dust",["Desert goat horn"])
    await addRequires("Kebbit teeth dust",["Kebbit teeth"])
    await addRequires("Roe",["Leaping trout"])
    await addRequires("Caviar",["Leaping sturgeon"])
    await addRequires("Chocolate dust",["Chocolate bar"]);
    await addRequires("Ground wyvern bones",["Wyvern bones"]);
    await addRequires("Swordfish",["Raw swordfish"]);
    await addRequires("Dragonstone",["Uncut dragonstone"])
    await addRequires("Crushed dragonstone",["Dragonstone"])
    await addRequires("Primal extract",["Primal fruit pulp","Vial"])
    await addRequires("Adrenaline crystal",["Primal extract","Inert adrenaline crystal","Spark chitin"])
    await addRequires("Coconut (open)",["Coconut"]);
    await addRequires("Coconut milk", ["Coconut (open)","Vial"] )

    await addRequires("Clean guam",["Grimy guam"])
    await addRequires("Clean marrentill",["Grimy marrentill"])
    await addRequires("Clean tarromin",["Grimy tarromin"])
    await addRequires("Clean harralander",["Grimy harralander"])
    await addRequires("Clean ranarr",["Grimy ranarr"])
    await addRequires("Clean irit",["Grimy irit"])
    await addRequires("Clean avantoe",["Grimy avantoe"])
    await addRequires("Clean kwuarm",["Grimy kwuarm"])
    await addRequires("Clean cadantine",["Grimy cadantine"])
    await addRequires("Clean dwarf weed",["Grimy dwarf weed"])
    await addRequires("Clean torstol",["Grimy torstol"])
    await addRequires("Clean snake weed",["Grimy snake weed"])
    await addRequires("Clean rogue's purse",["Grimy rogue's purse"])
    await addRequires("Clean lantadyme",["Grimy lantadyme"])
    await addRequires("Clean toadflax",["Grimy toadflax"])
    await addRequires("Clean snapdragon",["Grimy snapdragon"])
    await addRequires("Clean spirit weed",["Grimy spirit weed"])
    await addRequires("Clean wergali",["Grimy wergali"])
    await addRequires("Clean fellstalk",["Grimy fellstalk"])
    await addRequires("Clean bloodweed",["Grimy bloodweed"])
    await addRequires("Clean arbuck",["Grimy arbuck"])
    
    await addRequires("Clean erzille",["Grimy erzille"]);
    await addRequires("Clean argway",["Grimy argway"]);
    await addRequires("Clean ugune",["Grimy ugune"]);
    await addRequires("Clean shengo",["Grimy shengo"]);
    await addRequires("Clean samaden",["Grimy samaden"]);

    await addRequires("Guam potion (unf)",["Clean guam","Vial of water"]);
    await addRequires("Marrentill potion (unf)",["Clean marrentill","Vial of water"])
    await addRequires("Tarromin potion (unf)",["Clean tarromin","Vial of water"])
    await addRequires("Harralander potion (unf)",["Clean harralander","Vial of water"])
    await addRequires("Ranarr potion (unf)",["Clean ranarr","Vial of water"])
    await addRequires("Irit potion (unf)",["Clean irit","Vial of water"])
    await addRequires("Avantoe potion (unf)",["Clean avantoe","Vial of water"])
    await addRequires("Kwuarm potion (unf)",["Clean kwuarm","Vial of water"])
    await addRequires("Cadantine potion (unf)",["Clean cadantine","Vial of water"])
    await addRequires("Dwarf weed potion (unf)",["Clean dwarf weed","Vial of water"])
    await addRequires("Torstol potion (unf)",["Clean torstol","Vial of water"])
    await addRequires("Lantadyme potion (unf)",["Clean lantadyme","Vial of water"])
    await addRequires("Toadflax potion (unf)",["Clean toadflax","Vial of water"])
    await addRequires("Snapdragon potion (unf)",["Clean snapdragon","Vial of water"])
    await addRequires("Rogue's purse potion (unf)",["Clean rogue's purse","Vial of water"])
    await addRequires("Spirit weed potion (unf)",["Clean spirit weed","Vial of water"])
    await addRequires("Wergali potion (unf)",["Clean wergali","Vial of water"])
    await addRequires("Fellstalk potion (unf)",["Clean fellstalk","Vial of water"])
    await addRequires("Bloodweed potion (unf)",["Clean bloodweed","Vial of water"])
    await addRequires("Arbuck potion (unf)",["Clean arbuck","Vial of water"])
    await addRequires("Erzille potion (unf)",["Clean erzille","Juju vial of water"])
    await addRequires("Argway potion (unf)",["Clean argway","Juju vial of water"])
    await addRequires("Ugune potion (unf)",["Clean ugune","Juju vial of water"])
    await addRequires("Shengo potion (unf)",["Clean shengo","Juju vial of water"])
    await addRequires("Samaden potion (unf)",["Clean samaden","Juju vial of water"])

    await addRequires("Antipoison+ (unf)",["Coconut milk","Clean toadflax"]);
    await addRequires("Antipoison++ (unf)",["Coconut milk","Clean irit"]);
    await addRequires("Weapon poison+ (unf)",["Coconut milk","Cactus spine"]);
    await addRequires("Weapon poison++ (unf)",["Coconut milk","Cave nightshade"]);



    
 
    await addRequires("Attack potion (3)",["Guam potion (unf)","Eye of newt"])
    await addRequires("Attack potion (4)",["Attack potion (3)","Attack potion (1)"])
    await addRequires("Super attack (3)",["Irit potion (unf)","Eye of newt"])
    await addRequires("Super attack (4)",["Super attack (3)","Super attack (1)"])
    await addRequires("Extreme attack (3)",["Super attack (3)","Clean avantoe"])
    await addRequires("Extreme attack (4)",["Extreme attack (3)","Extreme attack (1)"])


    await addRequires("Strength potion (3)",["Tarromin potion (unf)", "Limpwurt root"])
    await addRequires("Strength potion (4)",["Strength potion (3)", "Strength potion (1)"])
    await addRequires("Super strength (3)",["Kwuarm potion (unf)","Limpwurt root"])
    await addRequires("Super strength (4)",["Super strength (3)","Super strength (1)"])
    await addRequires("Extreme strength (3)",["Super strength (3)","Clean dwarf weed"])
    await addRequires("Extreme strength (4)",["Extreme strength (3)","Extreme strength (1)"])


    await addRequires("Defence potion (3)",["Marrentill potion (unf)","Bear fur"])
    await addRequires("Defence potion (4)",["Defence potion (3)","Defence potion (1)"])
    await addRequires("Super defence (3)",["Cadantine potion (unf)","White berries"])
    await addRequires("Super defence (4)",["Super defence (3)","Super defence (1)"])
    await addRequires("Extreme defence (3)",["Super defence (3)","Clean lantadyme"])
    await addRequires("Extreme defence (4)",["Extreme defence (3)","Extreme defence (1)"])

    await addRequires("Ranging potion (3)",["Guam potion (unf)","Redberries"])
    await addRequires("Ranging potion (4)",["Ranging potion (3)","Ranging potion (1)"])
    await addRequires("Super ranging potion (3)",["Dwarf weed potion (unf)","Wine of Zamorak"])
    await addRequires("Super ranging potion (4)",["Super ranging potion (3)","Super ranging potion (1)"])
    await addRequires("Extreme ranging (3)",["Super ranging potion (3)","Grenwall spikes"])
    await addRequires("Extreme ranging (4)",["Extreme ranging (3)","Extreme ranging (1)"])

    await addRequires("Magic potion (3)",["Tarromin potion (unf)","Black bead"]) //note: need to consider alternative recipies
    await addRequires("Magic potion (4)",["Magic potion (3)","Magic potion (1)"])
    await addRequires("Super magic potion (3)",["Lantadyme potion (unf)","Potato cactus"])
    await addRequires("Super magic potion (4)",["Super magic potion (3)","Super magic potion (1)"])
    await addRequires("Extreme magic (3)",["Super magic potion (3)","Ground mud runes"]);
    await addRequires("Extreme magic (4)",["Extreme magic (3)","Extreme magic (1)"]);



    await addRequires("Overload (3)",["Extreme attack (3)","Extreme strength (3)","Extreme defence (3)","Extreme ranging (3)","Extreme magic (3)","Clean torstol"])
    await addRequires("Overload (4)",["Overload (3)","Overload (1)"])

    await addRequires("Supreme overload potion (6)",["Overload (4)","Super attack (4)","Super strength (4)","Super defence (4)","Super ranging potion (4)","Super magic potion (4)","Crystal flask"])
 
    await addRequires("Antifire (3)",["Lantadyme potion (unf)","Dragon scale dust"])
    await addRequires("Antifire (4)",["Antifire (3)","Antifire (1)"])

    await addRequires("Super antifire (3)",["Antifire (3)","Phoenix feather"])
    await addRequires("Super antifire (4)",["Super antifire (3)","Super antifire (1)"])

    await addRequires("Elder overload potion (6)",["Supreme overload potion (6)","Primal extract","Clean fellstalk"])

    await addRequires("Antipoison (3)",["Marrentill potion (unf)","Unicorn horn dust"])
    await addRequires("Super antipoison (3)",["Irit potion (unf)","Unicorn horn dust"])
    await addRequires("Super antipoison (4)",["Super antipoison (3)","Super antipoison (1)"])
    await addRequires("Antipoison+ (4)",["Antipoison+ (unf)","Yew roots"]);
    await addRequires("Antipoison++ (4)",["Antipoison++ (unf)","Magic roots"]);

    await addRequires("Weapon poison (3)",["Kwuarm potion (unf)","Dragon scale dust"])
    await addRequires("Weapon poison+ (3)",["Weapon poison+ (unf)","Red spiders' eggs"]);
    await addRequires("Weapon poison++ (3)",["Weapon poison++ (unf)","Poison ivy berries"]);


 
    await addRequires("Prayer renewal (3)",["Fellstalk potion (unf)","Morchella mushroom"])
    await addRequires("Prayer renewal (4)",["Prayer renewal (3)","Prayer renewal (1)"])

    await addRequires("Elder overload salve (6)",["Elder overload potion (6)","Prayer renewal (4)","Prayer potion (4)","Super antipoison (4)","Antifire (4)","Super antifire (4)"])

    await addRequires("Aggroverload (6)",["Overload (4)","Aggression potion (4)","Clean arbuck","Crystal flask"])
    await addRequires("Brightfire potion (6)",["Super antifire (4)","Prayer renewal (4)","Crystal flask"])
    await addRequires("Extreme battlemage's potion (6)",["Extreme defence (4)","Extreme magic (4)" ,"Crystal flask"])
    await addRequires("Extreme brawler's potion (6)",["Extreme attack (4)","Extreme strength (4)","Extreme defence (4)" ,"Crystal flask"])
    await addRequires("Extreme sharpshooter's potion (6)",["Extreme defence (4)","Extreme ranging (4)","Crystal flask"])
    await addRequires("Extreme warmaster's potion (6)",["Extreme attack (4)","Extreme strength (4)","Extreme defence (4)","Extreme ranging (4)","Extreme magic (4)","Crystal flask"])
    await addRequires("Grand attack potion (6)",["Attack potion (4)","Super attack (4)","Crystal flask"])
    await addRequires("Grand defence potion (6)",["Defence potion (4)","Super defence (4)" ,"Crystal flask"])
    await addRequires("Grand magic potion (6)",["Magic potion (4)","Super magic potion (4)","Crystal flask"])
    await addRequires("Grand ranging potion (6)",["Ranging potion (4)","Super ranging potion (4)","Crystal flask"])
    await addRequires("Grand strength potion (6)",["Strength potion (4)","Super strength (4)","Crystal flask"])
    await addRequires("Holy aggroverload (6)",["Aggression potion (4)","Prayer renewal (4)","Spider venom","Crystal flask"])
    await addRequires("Holy overload potion (6)",["Overload (4)","Prayer renewal (4)","Crystal flask"])
    await addRequires("Overload salve (6)",["Overload (4)","Prayer renewal (4)","Prayer potion (4)","Super antipoison (4)","Antifire (4)","Super antifire (4)" ,"Crystal flask"])
    await addRequires("Perfect plus potion (6)",["Overload (4)","Harmony moss","Crystal tree blossom" ,"Crystal flask"])
    await addRequires("Replenishment potion (6)",["Adrenaline potion (4)","Super restore (4)","Crystal flask"])
    await addRequires("Searing overload potion (6)",["Overload (4)","Super antifire (4)","Crystal flask"])
    await addRequires("Spiritual prayer potion (6)",["Summoning potion (4)","Prayer potion (4)","Primal extract","Crystal flask"])
    await addRequires("Super melee potion (6)",["Super attack (4)","Super strength (4)","Super defence (4)"  ,"Crystal flask"])
    await addRequires("Super prayer renewal potion (6)",["Prayer potion (4)","Prayer renewal (4)"  ,"Crystal flask"])
    await addRequires("Super warmaster's potion (6)",["Super attack (4)","Super strength (4)","Super defence (4)","Super ranging potion (4)","Super magic potion (4)"  ,"Crystal flask"])
    await addRequires("Supreme attack potion (6)",["Super attack (4)","Extreme attack (4)"  ,"Crystal flask"])
    await addRequires("Supreme defence potion (6)",["Super defence (4)","Extreme defence (4)"  ,"Crystal flask"])
    await addRequires("Supreme magic potion (6)",["Super magic potion (4)","Extreme magic (4)"  ,"Crystal flask"])
    await addRequires("Supreme overload salve (6)",["Supreme overload potion (6)","Prayer renewal (4)","Prayer potion (4)","Super antipoison (4)","Antifire (4)","Super antifire (4)","Crystal flask"])
    await addRequires("Supreme ranging potion (6)",["Super ranging potion (4)","Extreme ranging (4)"  ,"Crystal flask"])
    await addRequires("Supreme strength potion (6)",["Super strength (4)","Extreme strength (4)"  ,"Crystal flask"])
    await addRequires("Wyrmfire potion (6)",["Antifire (4)","Super antifire (4)"  ,"Crystal flask"])

    await addRequires("Energy potion (3)",["Harralander potion (unf)","Chocolate dust"])
    await addRequires("Super energy (3)",["Avantoe potion (unf)","Mort myre fungus"])
 
    await addRequires("Restore potion (3)",["Harralander potion (unf)","Red spiders' eggs"])
    await addRequires("Super restore (3)",["Snapdragon potion (unf)","Red spiders' eggs"])
    await addRequires("Super restore (4)",["Super restore (4)","Super restore (1)"])

    await addRequires("Adrenaline potion (3)",["Super energy (3)","Papaya fruit"])
    await addRequires("Adrenaline potion (4)",["Adrenaline potion (3)","Adrenaline potion (1)"])

    await addRequires("Super adrenaline potion (3)",["Adrenaline potion (3)","Adrenaline crystal"])
    await addRequires("Super adrenaline potion (4)",["Super adrenaline potion (3)","Super adrenaline potion (1)"])


    await addRequires("Adrenaline renewal potion (4)",["Super adrenaline potion (3)","Primal extract","Bottled dinosaur roar","Clean arbuck" ,"Crystal flask"]) //multiple recipes

    await addRequires("Prayer potion (3)",["Ranarr potion (unf)","Snape grass"])
    await addRequires("Prayer potion (4)",["Prayer potion (3)","Prayer potion (1)"]);
    await addRequires("Super prayer (3)",["Prayer potion (3)","Ground wyvern bones"])
 
    await addRequires("Combat potion (3)",["Harralander potion (unf)","Goat horn dust"])
    await addRequires("Summoning potion (3)",["Spirit weed potion (unf)","Cockatrice egg"])
    await addRequires("Summoning potion (4)",["Summoning potion (3)","Summoning potion (1)"])

 
    await addRequires("Saradomin brew (3)",["Toadflax potion (unf)","Crushed nest"])
    await addRequires("Super Saradomin brew (3)",["Saradomin brew (3)","Wine of Saradomin"])
 
    await addRequires("Zamorak brew (3)",["Torstol potion (unf)","Jangerberries"])
    await addRequires("Super Zamorak brew (3)",["Zamorak brew (3)","Wine of Zamorak"])
 
    await addRequires("Guthix rest (3)",["Harralander potion (unf)","Clean marrentill"])
    await addRequires("Super Guthix rest (3)",["Guthix rest (3)","Wine of Guthix"])

    await addRequires("Luck potion",["Bloodweed potion (unf)","Crushed dragonstone"])
    await addRequires("Enhanced luck potion",["Luck potion","Onyx bolt tips"])
 
    await addRequires("Aggression potion (3)",["Bloodweed potion (unf)","Searing ashes"]);
    await addRequires("Aggression potion (4)",["Aggression potion (3)","Aggression potion (1)"])
 
    await addRequires("Agility potion (3)",["Toadflax potion (unf)","Toad's legs"])
    await addRequires("Archaeology potion (3)",["Avantoe potion (unf)","Aerated sediment"])

    await addRequires("Cooking potion (3)",["Harralander potion (unf)","Swordfish"])
    await addRequires("Super cooking potion (3)",["Cooking potion (3)","Zygomite fruit"])
 
    await addRequires("Crafting potion (3)",["Wergali potion (unf)","Frog spawn"])
 
    await addRequires("Divination potion (3)",["Spirit weed potion (unf)","Rabbit foot"])
    await addRequires("Super divination (3)",["Divination potion (3)","Zygomite fruit"])

    await addRequires("Fishing potion (3)",["Avantoe potion (unf)","Snape grass"])
 
    await addRequires("Fletching potion (3)",["Wergali potion (unf)","Wimpy feather"])
 
    await addRequires("Hunter potion (3)",["Avantoe potion (unf)","Kebbit teeth dust"])
    await addRequires("Super hunter (3)",["Hunter potion (3)","Rabbit teeth"])
 
    await addRequires("Invention potion (3)",["Snapdragon potion (unf)","Chinchompa residue"])
    await addRequires("Super invention (3)",["Invention potion (3)","Spider fangs"])
 
    await addRequires("Runecrafting potion (3)",["Wergali potion (unf)","Summerdown wool"])
    await addRequires("Super runecrafting (3)",["Runecrafting potion (3)","Yak milk"])
 
    await addRequires("Spirit attraction potion (3)",["Primal extract","Enhanced luck potion","Timeworn tincture"])
    await addRequires("Harvest potion (3)",["Primal extract","Clean arbuck","Watermelon"])
    await addRequires("Charming potion (3)",["Primal extract","Gold charm","Green charm","Crimson charm","Blue charm","Spark chitin"]) //need to handle x of each ingredient where x>1

    await addRequires("Mixture - step 1 (3)",["Super restore (3)","Unicorn horn dust"])
    await addRequires("Mixture - step 2 (3)",["Mixture - step 1 (3)","Clean snake weed"])
    await addRequires("Sanfew serum (3)",["Mixture - step 2 (3)","Nail beast nails"])

    await addRequires("Scentless potion (3)",["Argway potion (unf)","Shadow vine"])  

    await addRequires("Perfect juju agility potion (3)",["Scentless potion (3)","Harmony moss"]) 

    await addRequires("Juju cooking potion (3)",["Shengo potion (unf)","Plant teeth"])

    await addRequires("Perfect juju dungeoneering potion (3)",["Zamorak's favour (3)","Harmony moss"]) 

    await addRequires("Juju farming potion (3)",["Ugune potion (unf)","Marble vine"]) 
    await addRequires("Perfect juju farming potion (3)",["Juju farming potion (3)","Harmony moss"]) 
 
    await addRequires("Juju fishing potion (3)",["Shengo potion (unf)","Aquatic vine"]) 
 
    await addRequires("Perfect juju herblore potion (3)",["Guthix's gift (3)","Harmony moss"]) 

    await addRequires("Juju hunter potion (3)",["Erzille potion (unf)","Corrupt vine"])
 
    await addRequires("Juju mining potion (3)",["Samaden potion (unf)","Draconic vine"])
    await addRequires("Perfect juju mining potion (3)",["Juju mining potion (3)","Harmony moss"])
 
    await addRequires("Perfect juju prayer potion (3)",["Saradomin's blessing (3)","Harmony moss"])
 
    await addRequires("Perfect juju smithing potion (3)",["Juju hunter potion (3)","Harmony moss"])
 
    await addRequires("Juju woodcutting potion (3)",["Samaden potion (unf)","Oily vine"])
    await addRequires("Perfect juju woodcutting potion (3)",["Juju woodcutting potion (3)", "Harmony moss"])
}

seedDB().
then(()=>{
    addRequiresPromise()
    .then(()=>{
        console.log("@==============================================@")
        console.log("||Seed complete, database is ready for prices.||")
        console.log("@==============================================@")
        mongoose.connection.close();
    })
})









