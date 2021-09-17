const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/PotionChain"
const HerbloreItem = require("../model/herbloreitem");

const fullFlasks = 
{
    "23131": "Juju mining flask (6)",
    "23137": "Juju cooking flask (6)",
    "23143": "Juju farming flask (6)",
    "23149": "Juju woodcutting flask (6)",
    "23155": "Juju fishing flask (6)",
    "23161": "Juju hunter flask (6)",
    "23167": "Scentless flask (6)",
    "23173": "Saradomin's blessing flask (6)",
    "23179": "Guthix's gift flask (6)",
    "23185": "Zamorak's favour flask (6)",
    "23195": "Attack flask (6)",
    "23207": "Strength flask (6)",
    "23219": "Restore flask (6)",
    "23231": "Defence flask (6)",
    "23243": "Prayer flask (6)",
    "23255": "Super attack flask (6)",
    "23267": "Fishing flask (6)",
    "23279": "Super strength flask (6)",
    "23291": "Super defence flask (6)",
    "23303": "Super ranging flask (6)",
    "23315": "Antipoison flask (6)",
    "23327": "Super antipoison flask (6)",
    "23339": "Zamorak brew flask (6)",
    "23351": "Saradomin brew flask (6)",
    "23363": "Antifire flask (6)",
    "23375": "Energy flask (6)",
    "23387": "Super energy flask (6)",
    "23399": "Super restore flask (6)",
    "23411": "Agility flask (6)",
    "23423": "Super magic flask (6)",
    "23435": "Hunter flask (6)",
    "23447": "Combat flask (6)",
    "23459": "Crafting flask (6)",
    "23471": "Fletching flask (6)",
    "23525": "Super prayer flask (6)",
    "23537": "Relicym's balm flask (6)",
    "23555": "Guthix balance flask (6)",
    "23567": "Sanfew serum flask (6)",
    "23579": "Antipoison+ flask (6)",
    "23591": "Antipoison++ flask (6)",
    "23609": "Prayer renewal flask (6)",
    "23621": "Summoning flask (6)",
    "25509": "Weapon poison flask (6)",
    "25521": "Weapon poison+ flask (6)",
    "25533": "Weapon poison++ flask (6)",
    "27504": "Ranging potion (4)",
    "27512": "Magic potion (4)",
    "27520": "Ranging flask (6)",
    "27532": "Magic flask (6)",
    "28215": "Super Zamorak brew flask (6)",
    "28227": "Super Saradomin brew flask (6)",
    "28239": "Super Guthix brew flask (6)",
    "29448": "Guthix rest flask (6)",
    "32859": "Perfect juju woodcutting flask (6)",
    "32871": "Perfect juju farming flask (6)",
    "32883": "Perfect juju mining flask (6)",
    "32895": "Perfect juju smithing flask (6)",
    "32907": "Perfect juju agility flask (6)",
    "32919": "Perfect juju prayer flask (6)",
    "32931": "Perfect juju herblore flask (6)",
    "32943": "Perfect juju dungeoneering flask (6)",
    "35741": "Perfect juju fishing potion (4)",
    "35754": "Perfect juju fishing flask (6)",
    "37939": "Aggression flask (6)",
    "43442": "Divination flask (6)",
    "43454": "Runecrafting flask (6)",
    "43466": "Invention flask (6)",
    "43478": "Super divination flask (6)",
    "43490": "Super runecrafting flask (6)",
    "43502": "Super invention flask (6)",
    "43514": "Super hunter flask (6)",
    "48590": "Cooking flask (6)",
    "48602": "Super cooking flask (6)",
    "48626": "Weapon poison+++ flask (6)",
    "48638": "Harvest flask (6)",
    "48662": "Charming potion flask (6)",
    "50807": "Summoning renewal flask (6)",
    "50819": "Archaeology flask (6)",
    "50831": "Spirit attraction flask (6)",
}
const fourDoses = 
{
    "113": "Strength potion (4)",
    "2428": "Attack potion (4)",
    "2430": "Restore potion (4)",
    "2432": "Defence potion (4)",
    "2434": "Prayer potion (4)",
    "2436": "Super attack (4)",
    "2438": "Fishing potion (4)",
    "2440": "Super strength (4)",
    "2442": "Super defence (4)",
    "2444": "Super ranging potion (4)",
    "2448": "Super antipoison (4)",
    "3008": "Energy potion (4)",
    "3016": "Super energy (4)",
    "3024": "Super restore (4)",
    "3032": "Agility potion (4)",
    "3040": "Super magic potion (4)",
    "9739": "Combat potion (4)",
    "9998": "Hunter potion (4)",
    "10909": "Mixture - step 1 (4)",
    "10917": "Mixture - step 2 (4)",
    "12140": "Summoning potion (4)",
    "14838": "Crafting potion (4)",
    "14846": "Fletching potion (4)",
    "15328": "Super prayer (4)",
    "20003": "Juju mining potion (4)",
    "20007": "Juju cooking potion (4)",
    "20011": "Juju farming potion (4)",
    "20015": "Juju woodcutting potion (4)",
    "20019": "Juju fishing potion (4)",
    "20023": "Juju hunter potion (4)",
    "20027": "Scentless potion (4)",
    "28191": "Super Saradomin brew (4)",
    "28199": "Super Zamorak brew (4)",
    "28207": "Super Guthix rest (4)",
    "32759": "Perfect juju woodcutting potion (4)",
    "32767": "Perfect juju farming potion (4)",
    "32775": "Perfect juju mining potion (4)",
    "32783": "Perfect juju smithing potion (4)",
    "32791": "Perfect juju agility potion (4)",
    "32799": "Perfect juju prayer potion (4)",
    "32807": "Perfect juju herblore potion (4)",
    "32815": "Perfect juju dungeoneering potion (4)",
    "37971": "Aggression potion (4)",
    "44045": "Divination potion (4)",
    "44053": "Runecrafting potion (4)",
    "44061": "Invention potion (4)",
    "44069": "Super divination (4)",
    "44077": "Super runecrafting (4)",
    "44085": "Super invention (4)",
    "44093": "Super hunter (4)",
    "48968": "Harvest potion (4)",
    "48984": "Charming potion (4)",
    "48992": "Cooking potion (4)",
    "49000": "Super cooking potion (4)",
    "50851": "Archaeology potion (4)",
    "50859": "Spirit attraction potion (4)",
}

const primitiveIngredients = 
{
    "199": "Grimy guam",
    "201": "Grimy marrentill",
    "203": "Grimy tarromin",
    "205": "Grimy harralander",
    "207": "Grimy ranarr",
    "209": "Grimy irit",
    "211": "Grimy avantoe",
    "213": "Grimy kwuarm",
    "215": "Grimy cadantine",
    "217": "Grimy dwarf weed",
    "219": "Grimy torstol",
    "221": "Eye of newt",
    "223": "Red spiders' eggs",
    "225": "Limpwurt root",
    "229": "Vial",
    "231": "Snape grass",
    "237": "Unicorn horn",
    "239": "White berries", 
    "243": "Blue dragon scale",
    "245": "Wine of Zamorak",
    "247": "Jangerberries",    
    "371": "Raw swordfish",   
    "592": "Ashes",
    "948": "Bear fur",
    "1470": "Red bead",
    "1472": "Yellow bead",
    "1474": "Black bead",
    "1476": "White bead",
    "1525": "Grimy snake weed",
    "1533": "Grimy rogue's purse",
    "1631": "Uncut dragonstone",
    "1923": "Bowl",
    "1939": "Swamp tar",
    "1951": "Redberries",
    "1973": "Chocolate bar",
    "2150": "Swamp toad",
    "2355": "Silver bar",
    "2485": "Grimy lantadyme",
    "2970": "Mort myre fungus",
    "3138": "Potato cactus",
    "3325": "Vampyre dust",
    "3049": "Grimy toadflax",
    "3051": "Grimy snapdragon",
    "4698": "Mud rune",
    "5004": "Frog spawn",
    "5982": "Watermelon",
    "6016": "Cactus spine",
    "6018": "Poison ivy berries",
    "6693": "Crushed nest",
    "6812": "Wyvern bones",
    "9194": "Onyx bolt tips",
    "9735": "Desert goat horn",
    "10109": "Kebbit teeth",
    "10134": "Rabbit foot",
    "10937": "Nail beast nails",
    "11328": "Leaping trout",
    "11330": "Leaping salmon",
    "11332": "Leaping sturgeon",
    "11525": "Wimpy feather",
    "12109": "Cockatrice egg",
    "12158": "Gold charm",
    "12159": "Green charm",
    "12160": "Crimson charm",
    "12163": "Blue charm",
    "12174": "Grimy spirit weed",
    "12539": "Grenwall spikes",
    "14836": "Grimy wergali",
    "19972": "Oily vine",
    "19973": "Draconic vine",
    "19975": "Plant teeth",
    "19976": "Aquatic vine",
    "19977": "Shadow vine",
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
    "19996": "Juju vial",
    "21622": "Morchella mushroom",
    "21626": "Grimy fellstalk",
    "23191": "Potion flask",
    "28253": "Wine of Guthix",
    "28256": "Wine of Saradomin",
    "32947": "Harmony moss",
    "34159": "Searing ashes",
    "37975": "Grimy bloodweed",
    "39067": "Adrenaline crystal",
    "43973": "Chinchompa residue",
    "43975": "Summerdown wool",
    "43977": "Springsheared wool",
    "43979": "Winterwold wool",
    "43981": "Fallfaced wool",
    "43983": "Zygomite fruit",
    "43985": "Rabbit teeth",
    "43987": "Spider fangs",
    "43989": "Yak milk",
    "43991": "Yak tuft",
    "43993": "Bull horns",
    "43997": "Spider venom",
    "48243": "Grimy arbuck",
    "48575": "Inert adrenaline crystal",
    "48578": "Avocado",
    "48580": "Mango",
    "48582": "Lychee",
    "48584": "Ciku",
    "48586": "Carambola",
    "48711": "Tombshroom",
    "48712": "Stinkfly",
    "48771": "Dragonfruit",
    "48773": "Golden dragonfruit",
    "48921": "Poison slime",
    "48922": "Dinosaur claws",
    "48923": "Spark chitin",
    "48925": "Beak snot",
    "48926": "Bottled dinosaur roar",
    "48960": "Powerburst vial",
    "48961": "Bomb vial",
    "48966": "Primal fruit pulp",
    "49523": "Aerated sediment",
    "50803": "Timeworn tincture",
}

const nonPrimitiveIngredients = 
{
    "91": "Guam potion (unf)",
    "93": "Marrentill potion (unf)",
    "95": "Tarromin potion (unf)",
    "97": "Harralander potion (unf)",
    "99": "Ranarr potion (unf)",
    "101": "Irit potion (unf)",
    "103": "Avantoe potion (unf)",
    "105": "Kwuarm potion (unf)",
    "107": "Cadantine potion (unf)",
    "109": "Dwarf weed potion (unf)",
    "111": "Torstol potion (unf)",
    "115": "Strength potion (3)",
    "121": "Attack potion (3)",
    "127": "Restore potion (3)",
    "133": "Defence potion (3)",
    "139": "Prayer potion (3)",
    "145": "Super attack (3)",
    "151": "Fishing potion (3)",
    "157": "Super strength (3)",
    "163": "Super defence (3)",
    "169": "Super ranging potion (3)",
    "175": "Antipoison (3)",
    "181": "Super antipoison (3)",
    "189": "Zamorak brew (3)",
    "227": "Vial of water",
    "235": "Unicorn horn dust",
    "241": "Dragon scale dust",
    "249": "Clean guam",
    "251": "Clean marrentill",
    "253": "Clean tarromin",
    "255": "Clean harralander",
    "257": "Clean ranarr",
    "259": "Clean irit",
    "261": "Clean avantoe",
    "263": "Clean kwuarm",
    "265": "Clean cadantine",
    "267": "Clean dwarf weed",
    "269": "Clean torstol",
    "373": "Swordfish",
    "1526": "Clean snake weed",
    "1534": "Clean rogue's purse",
    "1615": "Dragonstone",
    "1921": "Bowl of water",
    "1975": "Chocolate dust",
    "2152": "Toad's legs",
    "2481": "Clean lantadyme",
    "2483": "Lantadyme potion (unf)",
    "2998": "Clean toadflax",
    "3000": "Clean snapdragon",
    "3002": "Toadflax potion (unf)",
    "3004": "Snapdragon potion (unf)",
    "3010": "Energy potion (3)",
    "3018": "Super energy (3)",
    "3026": "Super restore (3)",
    "3034": "Agility potion (3)",
    "3042": "Super magic potion (3)",
    "4419": "Guthix rest (3)",
    "4456": "Bowl of hot water",
    "4840": "Rogue's purse potion (unf)",
    "6687": "Saradomin brew (3)",
    "7650": "Silver dust", 
    "9594": "Ground mud runes",
    "9736": "Goat horn dust",
    "9741": "Combat potion (3)",
    "10000": "Hunter potion (3)",
    "10111": "Kebbit teeth dust", 
    "10911": "Mixture - step 1 (3)",
    "10919": "Mixture - step 2 (3)",
    "10927": "Sanfew serum (3)",
    "11324": "Roe",
    "11326": "Caviar",
    "12142": "Summoning potion (3)",
    "12172": "Clean spirit weed",
    "12181": "Spirit weed potion (unf)",
    "14840": "Crafting potion (3)",
    "14848": "Fletching potion (3)",
    "14854": "Clean wergali",
    "14856": "Wergali potion (unf)",
    "15329": "Super prayer (3)",
    "19990": "Clean argway",
    "19989": "Clean erzille",
    "19991": "Clean ugune",
    "19992": "Clean shengo",
    "19993": "Clean samaden",
    "19994": "Juju vial of water",
    "19998": "Erzille potion (unf)",
    "19999": "Ugune potion (unf)",
    "20000": "Argway potion (unf)",
    "20001": "Shengo potion (unf)",
    "20002": "Samaden potion (unf)",
    "20004": "Juju mining potion (3)",
    "20008": "Juju cooking potion (3)",
    "20012": "Juju farming potion (3)",
    "20016": "Juju woodcutting potion (3)",
    "20020": "Juju fishing potion (3)",
    "20024": "Juju hunter potion (3)",
    "20028": "Scentless potion (3)",
    "20032": "Saradomin's blessing (3)",
    "20036": "Guthix's gift (3)",
    "20040": "Zamorak's favour (3)",
    "21624": "Clean fellstalk",
    "21628": "Fellstalk potion (unf)",
    "27506": "Ranging potion (3)",
    "27514": "Magic potion (3)",
    "28193": "Super Saradomin brew (3)",
    "28201": "Super Zamorak brew (3)",
    "28209": "Super Guthix rest (3)",
    "32757": "Perfect juju woodcutting potion (3)",
    "32765": "Perfect juju farming potion (3)",
    "32773": "Perfect juju mining potion (3)",
    "32781": "Perfect juju smithing potion (3)",
    "32789": "Perfect juju agility potion (3)",
    "32797": "Perfect juju prayer potion (3)",
    "32805": "Perfect juju herblore potion (3)",
    "32813": "Perfect juju dungeoneering potion (3)",
    "35739": "Perfect juju fishing potion (3)",
    "37914": "Crushed dragonstone",
    "37953": "Clean bloodweed",
    "37963": "Luck potion",
    "37969": "Aggression potion (3)",
    "37973": "Bloodweed potion (unf)",
    "39820": "Enhanced luck potion",
    "44047": "Divination potion (3)",
    "44055": "Runecrafting potion (3)",
    "44063": "Invention potion (3)",
    "44071": "Super divination (3)",
    "44079": "Super runecrafting (3)",
    "44087": "Super invention (3)",
    "44095": "Super hunter (3)",
    "48211": "Clean arbuck",
    "48241": "Arbuck potion (unf)",
    "48962": "Primal extract",
    "48970": "Harvest potion (3)",
    "48986": "Charming potion (3)",
    "48994": "Cooking potion (3)",
    "49002": "Super cooking potion (3)",
    "49123": "Ground wyvern bones",
    "50853": "Archaeology potion (3)",
    "50861": "Spirit attraction potion (3)"
}

mongoose.connect(dbUrl)
    .then(()=>{
        console.log(`[Mongoose | SUCCESS] - Connection Open @ ${dbUrl}`);
    })
    .catch((e)=>{
        console.log(`[Mongoose | ERROR] - ${e}`);
    })

const seedDB = async ()=>{
    try{
        await HerbloreItem.deleteMany({});
        for(const itemID in primitiveIngredients)
        {
            const primitiveIngredient = new HerbloreItem({
                name:primitiveIngredients[itemID],
                itemID: itemID,
                requires:[]
            })  
            await primitiveIngredient.save();     
        }
        for(const itemID in nonPrimitiveIngredients)
        {
            const nonPrimitiveIngredient = new HerbloreItem({
                name:nonPrimitiveIngredients[itemID],
                itemID: itemID,
                requires:[]
            })  
            await nonPrimitiveIngredient.save();     
        }
    }catch(e){
        console.log("seedPrimitives failed: ",e);
    }
}

const addRequires = async (potion,requires) =>
{
    const items = []
    console.log(requires);
    for(const material of requires)
    {
        const item = await HerbloreItem.findOne({name:material});
        items.push(item._id);
    }
    for(const item of items)
    {
        await HerbloreItem.findOneAndUpdate({name:potion},{$push:{requires:item}});
    }
}
//TODO:
//Handle multiple of each ingredient if needed
//Handle untradable images
//Handle alternative recipies 
seedDB().then(()=>{
    addRequires("Vial of water",["Vial"])
    addRequires("Juju vial of water",["Juju vial"])
    addRequires("Bowl of water",["Bowl"])
    addRequires("Bowl of hot water",["Bowl of water"])
    addRequires("Toad's legs",["Swamp toad"])
    addRequires("Unicorn horn dust",["Unicorn horn"])
    addRequires("Dragon scale dust",["Blue dragon scale"])
    addRequires("Silver dust",["Silver bar"] )
    addRequires("Ground mud runes",["Mud rune"])
    addRequires("Goat horn dust",["Desert goat horn"])
    addRequires("Kebbit teeth dust",["Kebbit teeth"])
    addRequires("Roe",["Leaping trout"])
    addRequires("Caviar",["Leaping sturgeon"])
    addRequires("Chocolate dust",["Chocolate bar"]);
    addRequires("Ground wyvern bones",["Wyvern bones"]);
    addRequires("Swordfish",["Raw swordfish"]);
    addRequires("Dragonstone",["Uncut dragonstone"])
    addRequires("Crushed dragonstone",["Dragonstone"])

    addRequires("Clean guam",["Grimy guam"])
    addRequires("Clean marrentill",["Grimy marrentill"])
    addRequires("Clean tarromin",["Grimy tarromin"])
    addRequires("Clean harralander",["Grimy harralander"])
    addRequires("Clean ranarr",["Grimy ranarr"])
    addRequires("Clean irit",["Grimy irit"])
    addRequires("Clean avantoe",["Grimy avantoe"])
    addRequires("Clean kwuarm",["Grimy kwuarm"])
    addRequires("Clean cadantine",["Grimy cadantine"])
    addRequires("Clean dwarf weed",["Grimy dwarf weed"])
    addRequires("Clean torstol",["Grimy torstol"])
    addRequires("Clean snake weed",["Grimy snake weed"])
    addRequires("Clean rogue's purse",["Grimy rogue's purse"])
    addRequires("Clean lantadyme",["Grimy lantadyme"])
    addRequires("Clean toadflax",["Grimy toadflax"])
    addRequires("Clean snapdragon",["Grimy snapdragon"])
    addRequires("Clean spirit weed",["Grimy spirit weed"])
    addRequires("Clean wergali",["Grimy wergali"])
    addRequires("Clean fellstalk",["Grimy fellstalk"])
    addRequires("Clean bloodweed",["Grimy bloodweed"])
    addRequires("Clean arbuck",["Grimy arbuck"])
    addRequires("Primal extract",["Primal fruit pulp","Vial"])

    addRequires("Marrentill potion (unf)",["Clean marrentill","Vial of water"])
    addRequires("Tarromin potion (unf)",["Clean tarromin","Vial of water"])
    addRequires("Harralander potion (unf)",["Clean harralander","Vial of water"])
    addRequires("Ranarr potion (unf)",["Clean ranarr","Vial of water"])
    addRequires("Irit potion (unf)",["Clean irit","Vial of water"])
    addRequires("Avantoe potion (unf)",["Clean avantoe","Vial of water"])
    addRequires("Kwuarm potion (unf)",["Clean kwuarm","Vial of water"])
    addRequires("Cadantine potion (unf)",["Clean cadantine","Vial of water"])
    addRequires("Dwarf weed potion (unf)",["Clean dwarf weed","Vial of water"])
    addRequires("Torstol potion (unf)",["Clean torstol","Vial of water"])
    addRequires("Lantadyme potion (unf)",["Clean lantadyme","Vial of water"])
    addRequires("Toadflax potion (unf)",["Clean toadflax","Vial of water"])
    addRequires("Snapdragon potion (unf)",["Clean snapdragon","Vial of water"])
    addRequires("Rogue's purse potion (unf)",["Clean rogue's purse","Vial of water"])
    addRequires("Spirit weed potion (unf)",["Clean spirit weed","Vial of water"])
    addRequires("Wergali potion (unf)",["Clean wergali","Vial of water"])
    addRequires("Fellstalk potion (unf)",["Clean fellstalk","Vial of water"])
    addRequires("Bloodweed potion (unf)",["Clean bloodweed","Vial of water"])
    addRequires("Arbuck potion (unf)",["Clean arbuck","Vial of water"])

    addRequires("Attack potion (3)",["Guam potion (unf)","Eye of newt"])
    addRequires("Super attack (3)",["Irit potion (unf)","Eye of newt"])

    addRequires("Strength potion (3)",["Tarromin potion (unf)", "Limpwurt root"])
    addRequires("Super strength (3)",["Kwuarm potion (unf)","Limpwurt root"])

    addRequires("Defence potion (3)",["Marrentill potion (unf)","Bear fur"])
    addRequires("Super defence (3)",["Cadantine potion (unf)","White berries"])

    addRequires("Ranging potion (3)",["Guam potion (unf)","Redberries"])
    addRequires("Super ranging potion (3)",["Dwarf weed potion (unf)","Wine of Zamorak"])

    //addRequires("Magic potion (3)",["Tarromin potion (unf)","Black bead"]) //note: need to consider alternative recipies
    addRequires("Super magic potion (3)",["Lantadyme potion (unf)","Potato cactus"])

    addRequires("Antipoison (3)",["Marrentill potion (unf)","Unicorn horn dust"])
    addRequires("Super antipoison (3)",["Irit potion (unf)","Unicorn horn dust"])

    addRequires("Energy potion (3)",["Harralander potion (unf)","Chocolate dust"])
    addRequires("Super energy (3)",["Avantoe potion (unf)","Mort myre fungus"])

    addRequires("Restore potion (3)",["Harralander potion (unf)","Red spiders' eggs"])
    addRequires("Super restore (3)",["Snapdragon potion (unf)","Red spiders' eggs"])

    addRequires("Prayer potion (3)",["Ranarr potion (unf)","Snape grass"])
    addRequires("Super prayer (3)",["Prayer potion (3)","Ground wyvern bones"])

    addRequires("Combat potion (3)",["Harralander potion (unf)","Goat horn dust"])
    addRequires("Summoning potion (3)",["Spirit weed potion (unf)","Cockatrice egg"])

    addRequires("Saradomin brew (3)",["Toadflax potion (unf)","Crushed nest"])
    addRequires("Super Saradomin brew (3)",["Saradomin brew (3)","Wine of Saradomin"])

    addRequires("Zamorak brew (3)",["Torstol potion (unf)","Jangerberries"])
    addRequires("Super Zamorak brew (3)",["Zamorak brew (3)","Wine of Zamorak"])

    addRequires("Guthix rest (3)",["Harralander potion (unf)","Clean marrentill"])
    addRequires("Super Guthix rest (3)",["Guthix rest (3)","Wine of Guthix"])

    addRequires("Luck potion",["Bloodweed potion (unf)","Crushed dragonstone"])
    addRequires("Enhanced luck potion",["Luck potion","Onyx bolt tips"])

    addRequires("Aggression potion (3)",["Bloodweed potion (unf)","Searing ashes"])

    addRequires("Agility potion (3)",["Toadflax potion (unf)","Toad's legs"])
    
    addRequires("Archaeology potion (3)",["Avantoe potion (unf)","Aerated sediment"])

    addRequires("Cooking potion (3)",["Harralander potion (unf)","Swordfish"])
    addRequires("Super cooking potion (3)",["Cooking potion (3)","Zygomite fruit"])

    addRequires("Crafting potion (3)",["Wergali potion (unf)","Frog spawn"])

    addRequires("Divination potion (3)",["Spirit weed potion (unf)","Rabbit foot"])
    addRequires("Super divination (3)",["Divination potion (3)","Zygomite fruit"])

    addRequires("Fishing potion (3)",["Avantoe potion (unf)","Snape grass"])

    addRequires("Fletching potion (3)",["Wergali potion (unf)","Wimpy feather"])

    addRequires("Hunter potion (3)",["Avantoe potion (unf)","Kebbit teeth dust"])
    addRequires("Super hunter (3)",["Hunter potion (3)","Rabbit teeth"])

    addRequires("Invention potion (3)",["Snapdragon potion (unf)","Chinchompa residue"])
    addRequires("Super invention (3)",["Invention potion (3)","Spider fangs"])

    addRequires("Runecrafting potion (3)",["Wergali potion (unf)","Summerdown wool"])
    addRequires("Super runecrafting (3)",["Runecrafting potion (3)","Yak milk"])


    addRequires("Spirit attraction potion (3)",["Primal extract","Enhanced luck potion","Timeworn tincture"])
    addRequires("Harvest potion (3)",["Primal extract","Clean arbuck","Watermelon"])
    // addRequires("Charming potion (3)",["Primal extract","Gold charm","Green charm","Crimson charm","Blue charm","Spark chitin"]) //need to handle x of each ingredient where x>1


    addRequires("Mixture - step 1 (3)",["Super restore (3)","Unicorn horn dust"])
    addRequires("Mixture - step 2 (3)",["Mixture - step 1 (3)","Clean snake weed"])
    addRequires("Sanfew serum (3)",["Mixture - step 2 (3)","Nail beast nails"])

    addRequires("Scentless potion (3)",["Argway potion (unf)","Shadow vine"])  

    addRequires("Perfect juju agility potion (3)",["Harmony moss","Scentless potion (3)"]) 

    addRequires("Juju cooking potion (3)",["Shengo potion (unf)","Plant teeth"])

    addRequires("Perfect juju dungeoneering potion (3)",["Harmony moss","Zamorak's favour (3)"]) 

    addRequires("Juju farming potion (3)",["Ugune potion (unf)","Marble vine"]) 
    addRequires("Perfect juju farming potion (3)",["Harmony moss","Juju farming potion (3)"]) 

    addRequires("Juju fishing potion (3)",["Shengo potion (unf)","Aquatic vine"]) 

    addRequires("Perfect juju herblore potion (3)",["Harmony moss","Guthix's gift (3)"]) 

    addRequires("Juju hunter potion (3)",["Erzille potion (unf)","Corrupt vine"])

    addRequires("Juju mining potion (3)",["Samaden potion (unf)","Draconic vine"])
    addRequires("Perfect juju mining potion (3)",["Harmony moss","Juju mining potion (3)"])

    addRequires("Perfect juju prayer potion (3)",["Harmony moss","Saradomin's blessing (3)"])

    addRequires("Perfect juju smithing potion (3)",["Harmony moss","Juju hunter potion (3)"])

    addRequires("Juju woodcutting potion (3)",["Samaden potion (unf)","Oily vine"])
    addRequires("Perfect juju woodcutting potion (3)",["Harmony moss","Juju woodcutting potion (3)"])

});








