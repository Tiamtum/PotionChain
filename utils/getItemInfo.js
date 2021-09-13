const runescape = require("runescape-api");
const grandexchange = runescape.grandexchange;

async function getItemInfo(itemID){
    return Promise.all(
        [
            await grandexchange.getItem(parseInt(itemID)),
            await grandexchange.getItemGraph(parseInt(itemID))
        ]
    )
}
module.exports = getItemInfo;