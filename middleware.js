module.exports.isOnPage = (req,res,next)=>{
    
    // if(!res.locals)
    // {
    //     res.locals.data = {};
    // }
    // if(res.locals.data)
    // {
    //     res.render("results",{name,number,image,currentPrice,coinPile,pageTitle:"PotionChain"})        
    // }

    if(Object.keys(req.session).find(key => key==="data")===undefined)
    {
        
    }

    next();
    
}