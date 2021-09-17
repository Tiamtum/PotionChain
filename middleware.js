module.exports.checkPreviousSearch = (req,res,next)=>{
    const {name,number} = req.query;
    if(Object.keys(req.session).find(key => key==="data")===undefined)
        {
            next();
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
                //add coinPile if-else if code here
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
                next();
            }     
        }
    
}