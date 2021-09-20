//middleware cannot find ingredients array, this needs to be fixed
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
                const {name,image,exactPrice} = req.session.data;
                const totalPrice = parseInt(exactPrice)*number;
                
                let coinPile;
                if(totalPrice===1){coinPile="/images/Coins_1.webp";}
                else if(totalPrice===2){coinPile="/images/Coins_2.webp";}
                else if(totalPrice===3){coinPile="/images/Coins_3.webp";}
                else if(totalPrice===4){coinPile="/images/Coins_4.webp";}
                else if(totalPrice>=5 && totalPrice<25){coinPile="/images/Coins_5.webp";}
                else if(totalPrice>=25 && totalPrice<100){coinPile="/images/Coins_25.webp";}
                else if(totalPrice>=100 && totalPrice<250){coinPile="/images/Coins_100.webp";}
                else if(totalPrice>=250 && totalPrice<1000){coinPile="/images/Coins_250.webp";}
                else if(totalPrice>=1000 && totalPrice<10000){coinPile="/images/Coins_1000.webp";}
                else{coinPile="/images/Coins_10000.webp";}

                req.session.data.totalPrice = totalPrice; 
                req.session.data.number = number;
                req.session.data.coinPile = coinPile;
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