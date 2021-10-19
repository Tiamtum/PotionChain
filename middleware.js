const {getCoinPile,parseName,parsePrice} = require("./utils/potionDataHelpers");
const ExpressError = require("./utils/ExpressError");

module.exports.checkPreviousSearch = (req,res,next)=>{
    const name = parseName(req.query.name);
    console.log("NAME: ", name);
    const number = parseInt(req.query.number);
    const display = req.query.display
    console.log(display);
    console.log("req.session.displaySetting:",req.session.displaySetting);
    if(Object.keys(req.session).find(key => key==="data")===undefined)
    {
        next();
    }
    else
    {
        try
        {
            console.log("ELSE CONDITION, req.session.data exists")
            if(req.session.data.length===0) //fixes weird bug triggered by using browser back-button 
            {
                return next();
            }
            if(name === req.session.data[0].item && number === req.session.data[0].data.number)
            {
                console.log("same name, same number")
                const costData = req.session.costData;
                if(display === "full")
                {
                    console.log("display: full")
                    if(req.session.displaySetting === "essential")
                    {
                        console.log("req.session.displaySetting changed from full to essential")
                        delete req.session.data;
                        next();
                    }
                    else
                    {
                        console.log("req.session.displaySetting unchanged from full")
                        const ingredients = req.session.data;
                        res.render("results",{ingredients,costData,"displaySetting":display, pageTitle:"PotionChain"})                       
                    }
                }
                else if(display === "essential")
                {
                    console.log("display: essential")
                    const ingredients = req.session.data.filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
                    res.render("results",{ingredients,costData,"displaySetting":display, pageTitle:"PotionChain"})
                }
            }
            else if(name === req.session.data[0].item && number !== req.session.data[0].data.number)
            {
                console.log("==same name, different number==")           
                if(display === "full")
                {
                    if(req.session.displaySetting === "essential")
                    {
                        delete req.session.data;
                        next();                   
                    }
                    else
                    {
                        const ingredients = req.session.data;
                        for(const ingredient of ingredients )
                        {
                            ingredient.data.number = number;
                            ingredient.data.totalPrice = {"value":number * ingredient.data.exactPrice,"string":parsePrice(number * ingredient.data.exactPrice)};
                            ingredient.data.coinPile = getCoinPile(ingredient.data.totalPrice.value);
                        }
                        let totals = 0 ;
                        for(let i = 1; i<ingredients.length; i++)
                        {
                            totals += ingredients[i].data.totalPrice.value 
                        }
                        const costData = 
                        {
                            "profit" : {"value":ingredients[0].data.totalPrice.value - totals, "string":parsePrice(ingredients[0].data.totalPrice.value - totals),"coinPile":getCoinPile(ingredients[0].data.totalPrice.value - totals)},
                            "priceToMake" : {"value":totals,"string":parsePrice(totals),"coinPile":getCoinPile(totals)}
                        }
                        req.session.costData = costData;
                        req.session.save();
                        res.render("results",{ingredients,costData,"displaySetting":display, pageTitle:"PotionChain"})
                    }
                }
                else if(display === "essential")
                {
                    const ingredients = req.session.data.filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
                    for(const ingredient of ingredients )
                    {
                        ingredient.data.number = number;
                        ingredient.data.totalPrice = {"value":number * ingredient.data.exactPrice,"string":parsePrice(number * ingredient.data.exactPrice)};
                        ingredient.data.coinPile = getCoinPile(ingredient.data.totalPrice.value);
                    }
                    let totals = 0 ;
                    for(let i = 1; i<ingredients.length; i++)
                    {
                        totals += ingredients[i].data.totalPrice.value 
                    }
                    const costData = 
                    {
                        "profit" : {"value":ingredients[0].data.totalPrice.value - totals, "string":parsePrice(ingredients[0].data.totalPrice.value - totals),"coinPile":getCoinPile(ingredients[0].data.totalPrice.value - totals)},
                        "priceToMake" : {"value":totals,"string":parsePrice(totals),"coinPile":getCoinPile(totals)}
                    }
                    req.session.costData = costData;
                    req.session.save();
                    res.render("results",{ingredients,costData,"displaySetting":display, pageTitle:"PotionChain"})
                }
            }
            else
            {
                console.log("==different name==")
                delete req.session.data;
                delete req.session.costData;
                console.log(req.session);
                console.log("querying db...");
                next();
            }    
        }
        catch(e)
        {
            console.log("middleware error: ",e);
            throw new ExpressError("Something broke in the middleware",500);
        }
 
    }
    
}