function priceParser(currentPrice)
{
    const commaIndex = currentPrice.indexOf(",");
    const currentPriceInt = parseInt(currentPrice.substring(0,commaIndex)+currentPrice.substring(commaIndex+1));
}