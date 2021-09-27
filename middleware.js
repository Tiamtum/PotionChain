const {getCoinPile} = require("./utils/potionDataHelpers");

// module.exports.checkPreviousSearch = (req,res,next)=>{
//     const name = req.query.name;
//     const number = parseInt(req.query.number);
//     if(Object.keys(req.session).find(key => key==="data")===undefined)
//         {
//             next();
//         }
//         else
//         {
//             console.log("ELSE CONDITION, req.session.data exists")
//             if(name === req.session.data[0].item && number === req.session.data[0].data.number)
//             {
//                 console.log("same name, same number")
//                 const finalPrice = req.session.finalPrice
//                 const ingredients = req.session.data;
//                 res.render("results",{ingredients,finalPrice, pageTitle:"PotionChain"})

//             }
//             else if(name === req.session.data[0].item && number !== req.session.data[0].data.number)
//             {
//                 console.log("==same name, different number==")
//                 const ingredients = req.session.data;
//                 let finalPrice = 0 ;
//                 for(const ingredient of ingredients )
//                 {
//                     ingredient.data.number = number;
//                     ingredient.data.totalPrice = number * ingredient.data.exactPrice;
//                     ingredient.data.coinPile = getCoinPile(ingredient.data.totalPrice);
//                     if(ingredient.item != name)
//                     {
//                         finalPrice+=ingredient.data.totalPrice;
//                     }
//                 }

//                 console.log(finalPrice,typeof(finalPrice));
//                 req.session.data = ingredients;
//                 req.session.finalPrice = finalPrice;
//                 req.session.save();
//                 res.render("results",{ingredients,finalPrice,pageTitle:"Potion Chain"});
//             }
//             else
//             {
//                 console.log("==different name==")
//                 delete req.session.data;
//                 console.log(req.session);
//                 console.log("querying db...");
//                 next();
//             }     
//         }
    
// }


module.exports.checkPreviousSearchOnTest = (req,res,next)=>{
    const name = req.query.name;
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
            console.log("ELSE CONDITION, req.session.data exists")
            if(name === req.session.data[0].item && number === req.session.data[0].data.number)
            {
                console.log("same name, same number")
                const finalPrice = req.session.finalPrice
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
                        res.render("test",{ingredients,finalPrice,"displaySetting":display, pageTitle:"PotionChain"})                       
                    }
                }
                else if(display === "essential")
                {
                    const ingredients = req.session.data.filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
                    res.render("test",{ingredients,finalPrice,"displaySetting":display, pageTitle:"PotionChain"})
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
                    let finalPrice = 0 ;
                    for(const ingredient of ingredients )
                    {
                        ingredient.data.number = number;
                        ingredient.data.totalPrice = number * ingredient.data.exactPrice;
                        ingredient.data.coinPile = getCoinPile(ingredient.data.totalPrice);
                        if(ingredient.item != name)
                        {
                            finalPrice+=ingredient.data.totalPrice;
                        }
                    }
                    req.session.finalPrice = finalPrice;
                    req.session.save();
                    res.render("test",{ingredients,finalPrice,"displaySetting":display, pageTitle:"PotionChain"})
                }
            }
            else if(display === "essential")
            {
                const ingredients = req.session.data.filter(ingredient => ingredient.tab === 0 || ingredient.tab === 1);
                let finalPrice = 0 ;
                for(const ingredient of ingredients )
                {
                    ingredient.data.number = number;
                    ingredient.data.totalPrice = number * ingredient.data.exactPrice;
                    ingredient.data.coinPile = getCoinPile(ingredient.data.totalPrice);
                    if(ingredient.item != name)
                    {
                        finalPrice+=ingredient.data.totalPrice;
                    }
                }
                req.session.finalPrice = finalPrice;
                req.session.save();
                res.render("test",{ingredients,finalPrice,"displaySetting":display, pageTitle:"PotionChain"})
            }
        }
        else
        {
            console.log("==different name==")
            delete req.session.data;
            console.log(req.session);
            console.log("querying db...");
            next();
        }     
    }
}