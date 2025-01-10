import ShopCoinInvest from "../shops/ShopCoinInvest.js";
import ShopApartMint from "../shops/ShopApartMint.js";
import ShopNobleInvestments from "../shops/ShopNobleInvestments.js";
import ShopFlyingAtom from "../shops/ShopFlyingAtom.js";
import ShopGoldenmark from "../shops/ShopGoldenmark.js";
import ShopTreasuryMint from "../shops/ShopTreasuryMint.js";
import ShopElement79 from "../shops/ShopElement79.js";
import ShopPolishMint from "../shops/ShopPolishMint.js";
import {coins} from "../constants.js";
import ShopSilverMint from "../shops/ShopSilverMint.js";
import ShopMetalMarket from "../shops/ShopMetalMarket.js";
import ShopChojnackiKwiecien from "../shops/ShopChojnackiKwiecien.js";
import ShopGoldon from "../shops/ShopGoldon.js";

const shops = [
  new ShopCoinInvest(),
  new ShopApartMint(),
  new ShopNobleInvestments(),
  new ShopFlyingAtom(),
  new ShopGoldenmark(),
  new ShopGoldon(),
  new ShopTreasuryMint(),
  new ShopElement79(),
  new ShopPolishMint(),
  new ShopSilverMint(),
  new ShopMetalMarket(),
  // new ShopMintOfGdansk(), Temporarly disabled
  new ShopChojnackiKwiecien()
]

const getShopsPrices = async () => {
  const coinPrices = await Promise.all(Object.values(coins).map(async coin => {
    const pricesPromises = await Promise.allSettled(shops.map(async shop => ({
      name: coin,
      shop: shop.id,
      ...(await shop.getCoinPrice(coin)),
    })));

    const prices = pricesPromises.filter(price => price.status === 'fulfilled').map(price => price.value);

    pricesPromises.filter(price => price.status === 'rejected').forEach(price => {
      if (price.reason.message.includes('Price couldn')) {
        console.log(price.reason.message)
      }
    })

    return prices
  }));

  return coinPrices.flat(1);
}

const getShopsIds = () => shops.map(shop => shop.id);

export {getShopsPrices, getShopsIds};
