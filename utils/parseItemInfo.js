const parseItemInfo = async(itemInfo,number)=>
{
    const image = itemInfo[0].icons.default
    const exactPrice = itemInfo[1].daily[Object.keys(itemInfo[1].daily)[Object.keys(itemInfo[1].daily).length-1]] //access the value of the last key in daily
    const totalPrice = exactPrice*number;
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
    return [image,exactPrice,totalPrice,coinPile];
}

module.exports = parseItemInfo;