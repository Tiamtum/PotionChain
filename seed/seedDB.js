const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/PotionChain"
const HerbloreItem = require("../model/herbloreitem");
const {spawn} = require('child_process');

const primitiveIngredients = 
{
    "119": "Strength potion (1)",
    "125": "Attack potion (1)",
    "137": "Defence potion (1)",
    "143": "Prayer potion (1)",
    "149": "Super attack (1)",
    "161": "Super strength (1)",
    "167": "Super defence (1)",
    "173": "Super ranging potion (1)",
    "185": "Super antipoison (1)",
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
    "3030": "Super restore (1)",
    "3046": "Super magic potion (1)",
    "3049": "Grimy toadflax",
    "3051": "Grimy snapdragon",
    "4698": "Mud rune",
    "5004": "Frog spawn",
    "5972": "Papaya fruit",
    "5974": "Coconut",
    "5982": "Watermelon",
    "6016": "Cactus spine",
    "6018": "Poison ivy berries",
    "6049": "Yew roots",
    "6051": "Magic roots",
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
    "12146": "Summoning potion (1)",
    "12158": "Gold charm",
    "12159": "Green charm",
    "12160": "Crimson charm",
    "12163": "Blue charm",
    "12174": "Grimy spirit weed",
    "12539": "Grenwall spikes",
    "14836": "Grimy wergali",
    "15331": "Super prayer (1)",
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
    "19996": "Juju vial",
    "21622": "Morchella mushroom",
    "21626": "Grimy fellstalk",
    "21636": "Prayer renewal (1)",
    "23191": "Potion flask",
    "28253": "Wine of Guthix",
    "28256": "Wine of Saradomin",
    "32270": "Crystal tree blossom",
    "32843": "Crystal flask",
    "32947": "Harmony moss",
    "34159": "Searing ashes",
    "37965": "Aggression potion (1)",
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

    "900006": "Overload (1)",
    "900019": "Extreme attack (1)",
    "900020": "Extreme strength (1)",
    "900021": "Extreme defence (1)",
    "900022": "Extreme ranging (1)",
    "900023": "Extreme magic (1)",
    "900031": "Adrenaline potion (1)",
    "900034": "Super adrenaline potion (1)",
    "900041": "Cave nightshade"
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
    "113": "Strength potion (4)",
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
    "2428": "Attack potion (4)",
    "2432": "Defence potion (4)",
    "2434": "Prayer potion (4)",
    "2436": "Super attack (4)",
    "2440": "Super strength (4)",
    "2442": "Super defence (4)",
    "2444": "Super ranging potion (4)",
    "2448": "Super antipoison (4)",
    "2481": "Clean lantadyme",
    "2483": "Lantadyme potion (unf)",
    "2998": "Clean toadflax",
    "3000": "Clean snapdragon",
    "3002": "Toadflax potion (unf)",
    "3004": "Snapdragon potion (unf)",
    "3008": "Energy potion (4)",
    "3010": "Energy potion (3)",
    "3016": "Super energy (4)",
    "3018": "Super energy (3)",
    "3024": "Super restore (4)",
    "3026": "Super restore (3)",
    "3034": "Agility potion (3)",
    "3040": "Super magic potion (4)",
    "3042": "Super magic potion (3)",
    "4419": "Guthix rest (3)",
    "4456": "Bowl of hot water",
    "4840": "Rogue's purse potion (unf)",
    "5935": "Coconut milk",
    "5943": "Antipoison+ (4)",
    "5952": "Antipoison++ (4)",
    "5976": "Coconut (open)",
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
    "12140": "Summoning potion (4)",
    "12142": "Summoning potion (3)",
    "12172": "Clean spirit weed",
    "12181": "Spirit weed potion (unf)",
    "14840": "Crafting potion (3)",
    "14848": "Fletching potion (3)",
    "14854": "Clean wergali",
    "14856": "Wergali potion (unf)",
    "15328": "Super prayer (4)",
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
    "21630": "Prayer renewal (4)",
    "21632": "Prayer renewal (3)",
    "25487": "Weapon poison (3)",
    "25495": "Weapon poison+ (3)",
    "25503": "Weapon poison++ (3)",
    "27504": "Ranging potion (4)",
    "27506": "Ranging potion (3)",
    "27510": "Ranging potion (1)",
    "27512": "Magic potion (4)",
    "27514": "Magic potion (3)",
    "27518": "Magic potion (1)",
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
    "32958": "Grand strength potion (6)",
    "32970": "Grand ranging potion (6)",
    "32982": "Grand magic potion (6)",
    "32994": "Grand attack potion (6)",
    "33006": "Grand defence potion (6)",
    "33018": "Super melee potion (6)",
    "33186": "Super prayer renewal potion (6)",
    "33030": "Super warmaster's potion (6)",
    "35739": "Perfect juju fishing potion (3)",
    "37914": "Crushed dragonstone",
    "37953": "Clean bloodweed",
    "37963": "Luck potion",
    "37969": "Aggression potion (3)",
    "37971": "Aggression potion (4)",
    "37973": "Bloodweed potion (unf)",
    "39820": "Enhanced luck potion",
    "49027": "Spiritual prayer potion (6)",
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
    "50861": "Spirit attraction potion (3)",

    "899995": "Extreme runecrafting (3)",
    "899996": "Extreme invention (3)",
    "899997": "Extreme hunter (3)",
    "899998": "Extreme divination (3)",
    "899999": "Extreme cooking potion (3)",
    "900000": "Extreme attack (3)",
    "900001": "Extreme strength (3)",
    "900002": "Extreme defence (3)",
    "900003": "Extreme ranging (3)",
    "900004": "Extreme magic (3)",
    "900005": "Overload (3)",
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
    "900024": "Extreme attack (4)",
    "900025": "Extreme strength (4)",
    "900026": "Extreme defence (4)",
    "900027": "Extreme ranging (4)",
    "900028": "Extreme magic (4)",
    "900029": "Adrenaline potion (3)",
    "900030": "Adrenaline potion (4)",
    "900032": "Enhanced replenishment potion",
    "900033": "Adrenaline renewal potion (4)",
    "900035": "Super adrenaline potion (3)",
    "900036": "Super adrenaline potion (4)",
    "900037": "Antipoison+ (unf)",
    "900038": "Antipoison++ (unf)",
    "900039": "Weapon poison+ (unf)",
    "900040": "Weapon poison++ (unf)",
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
    "2438": "Fishing potion (4)",   
    "3032": "Agility potion (4)",    
    "9739": "Combat potion (4)",
    "9998": "Hunter potion (4)",
    "10909": "Mixture - step 1 (4)",
    "10917": "Mixture - step 2 (4)",    
    "14838": "Crafting potion (4)",
    "14846": "Fletching potion (4)",   
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

mongoose.connect(dbUrl)
    .then(()=>{
        console.log(`[Mongoose | SUCCESS] - Connection Open @ ${dbUrl}`);
    })
    .catch((e)=>{
        console.log(`[Mongoose | ERROR] - ${e}`);
    })


//python call has to be done asychronusly

const python = spawn('python',['getCacheTime.py']);

let cacheTime;

python.stdout.on('data',function(data)
{
    cacheTime = data.toString();
});

python.stderr.on('data',data => {
    console.error(`stderr: ${data}`);
});

python.on('exit', (code) => {
    console.log(`child process existed with code ${code}, cacheTime = ${cacheTime}`);
})

const imageLinks = [
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=143`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=149`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=161`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=167`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=173`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=185`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=199`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=201`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=203`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=205`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=207`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=209`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=211`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=213`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=215`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=217`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=219`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=221`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=223`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=225`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=229`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=231`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=237`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=239`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=243`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=245`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=247`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=371`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=592`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=948`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1470`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1472`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1474`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1476`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1631`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1923`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1939`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1951`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1973`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2150`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2355`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2485`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2970`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3046`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3049`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3051`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3138`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3325`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=4698`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5982`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6016`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6018`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6693`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6812`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=9194`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=9735`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10109`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10134`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10937`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11328`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11330`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11332`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11525`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12109`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12146`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12174`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12539`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=14836`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=15331`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=19996`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21622`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21626`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=23191`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=28253`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=28256`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32843`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32947`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=34159`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37965`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37975`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=39067`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43973`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43975`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43977`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43979`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43981`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43983`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43985`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43987`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43989`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43991`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43993`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=43997`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48243`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48575`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48578`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48580`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48582`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48584`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48586`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48711`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48712`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48771`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48773`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48921`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48922`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48923`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48925`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48926`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48960`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48961`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48966`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=49523`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=50803`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=91`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=93`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=95`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=97`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=99`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=101`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=103`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=105`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=107`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=109`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=111`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=115`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=121`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=127`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=133`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=139`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=145`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=151`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=157`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=163`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=169`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=175`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=181`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=189`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=227`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=235`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=241`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=249`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=251`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=257`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=261`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=265`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=373`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1975`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2434`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2436`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2442`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2481`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2998`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3002`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3010`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3018`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3026`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3042`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=4456`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6687`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=9736`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10000`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10911`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11324`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12140`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12181`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=14848`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=14856`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=19999`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20001`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20004`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20016`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20024`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20032`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21624`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27506`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=28193`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32757`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32773`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32789`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32813`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37914`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37963`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37973`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44047`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44063`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44087`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48211`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48970`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48994`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=253`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=255`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=259`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=263`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=267`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=269`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1615`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=1921`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2152`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2440`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2444`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2448`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2483`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3000`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3004`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3008`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3016`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3024`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3034`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=3040`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=4419`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=4840`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=7650`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=9594`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=9741`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10111`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10919`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=10927`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=11326`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12142`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=12172`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=14840`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=14854`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=15328`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=15329`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=19994`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=19998`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20000`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20002`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20008`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20012`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20020`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20028`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20036`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=20040`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21628`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27514`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=28201`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=28209`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32765`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32781`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32797`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32805`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=35739`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37953`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37969`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=37971`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=39820`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44055`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44071`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44079`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=44095`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48241`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48962`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=48986`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=49002`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=50853`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=50861`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21630`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=21632`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5943`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5952`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=25495`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=25503`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=25487`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32994`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=33006`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32982`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32970`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=32958`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=49027`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=33018`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=33186`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=33030`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=125`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2428`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=119`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=113`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=137`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=2432`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27518`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27512`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27510`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=27504`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6051`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=6049`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5935`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5974`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5976`,
    `https://secure.runescape.com/m=itemdb_rs/${cacheTime}_obj_sprite.gif?id=5972`
]

const linkIDs = {}
for(const link of imageLinks)
{
    linkIDs[link.slice(link.indexOf("?")+4)] = link;
}

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
        console.log("||Seed complete, database is ready.            ||")
        console.log("@==============================================@")
        mongoose.connection.close();
    })
})