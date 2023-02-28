import ShopCoinInvest from "./shops/ShopCoinInvest.js";
import ShopApartMint from "./shops/ShopApartMint.js";
import ShopNobleInvestments from "./shops/ShopNobleInvestments.js";
import ShopFlyingAtom from "./shops/ShopFlyingAtom.js";
import ShopGoldenmark from "./shops/ShopGoldenmark.js";
import ShopTreasuryMint from "./shops/ShopTreasuryMint.js";
import ShopElement79 from "./shops/ShopElement79.js";
import ShopPolishMint from "./shops/ShopPolishMint.js";
import {coins} from "./constants.js";

const shops = [
  new ShopCoinInvest(),
  new ShopApartMint(),
  new ShopNobleInvestments(),
  new ShopFlyingAtom(),
  new ShopGoldenmark(),
  new ShopTreasuryMint(),
  new ShopElement79(),
  new ShopPolishMint(),
]

const getGoldPrice = async () => {
  const response = await fetch("https://market-data.tavex.pl/v1/spot-price/xignite-metals?symbol=XAUPLN", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://tavex.pl/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const data = await response.json();


  return data.data.mid;
}

const scrapeGoldPrices = async () => {
  const goldPrice = await getGoldPrice();

  const coinPrices = await Promise.all(Object.values(coins).map(async coin => {
    const pricesPromises = await Promise.allSettled(shops.map(async shop => ({
      name: shop.id,
      price: await shop.getCoinPrice(coin),
    })));

    const prices = pricesPromises.filter(price => price.status === 'fulfilled').map(price => price.value);

    return {
      name: coin,
      prices
    }
  }));

  return {goldPrice, coinPrices, timestamp: new Date().toISOString()}
}

export default scrapeGoldPrices;
