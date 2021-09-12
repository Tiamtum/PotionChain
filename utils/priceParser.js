//Need to parse values above 9,999 differently.
//e.g.: 10.5k, 11.3m, 2.1b

// async function getItemID(name)
// {
//     console.log("getItemID called");    
//     // fs.readFile("itemIDs",(err,data)=>{
//     //         for(ID in itemIDs)
//     //         {
//     //             if(itemIDs[ID]===name)
//     //             {
//     //                 console.log(`ID found: ${ID}`);
//     //                 return parseInt(ID);
//     //             }
//     //         }
//     //     })
//     try {
//         return await fsPromises.readFile('./itemIDs.json');
//       } catch (err) {
//         console.error('Error occured while reading directory!', err);
//       }

// }

// async function getItemDetails(itemID) //can get examine details later if needed
// {
//     await grandexchange.getItem(parseInt(itemID)).then(data => {       
//         return data.icons.default;
//     })   
// }

// async function getExactPrice(itemID)
// {
//     await grandexchange.getItemGraph(parseInt(itemID)).then(data => {
//         // console.log(`==============graph entered:`)
//         return parseInt(data.daily[Object.keys(data.daily)[Object.keys(data.daily).length-1]])
//         // return data.daily;
        
//     })    
// }




// async function accumulateData(name)
// {
//     // await getItemID(name).then(itemID=>{
//     //     console.log(`itemID: ${itemID}`);
//     //     return Promise.all([
//     //         getItemDetails(itemID),
//     //         getExactPrice(itemID)
//     //     ])
//     // })
//     // const itemID = await getItemID(name);
//     // console.log(itemID);
//     // return Promise.all([await getItemID(name)])
// }