const herbData = [];
const alphabet="abcdefghijklmnopqrstuvwxyz";
for(let i =0; i<miniAlpha.length; i++)
{
        const ge = await grandexchange.getCategoryCountsByPrefix(13,alphabet.charAt(i)).then(data=>{
        for(const item of data)
        {
            const itemIDRaw = item.id.toString();
            const itemIDNewLine = itemIDRaw+"\r\n";
            fs.appendFile("herbIngredIDs.txt",itemIDNewLine,(err)=>{
                if(err) console.log(err);
            })
        }
    })   
}      