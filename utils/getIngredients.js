function getIngredients(data,tab=0,itemAndTab=[])
{
    if(data.requires.length===0)
    {
        const item = data.name;
        itemAndTab.push({item,tab})
        tab++;
    }
    else
    {
        const item = data.name;
        itemAndTab.push({item,tab})
        for(const ingredient of data.requires)
        {
            getIngredients(ingredient,tab+1,itemAndTab)
        }
        return itemAndTab;
    }
}
module.exports = getIngredients;