import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";

class ShopCoinInvest extends BaseShop {
  constructor() {
    super('COININVEST', "CoinInvest", 'https://www.coininvest.com');

    this.priceSelector = 'div.cmp_product_offers_head.vendor_0 > div.cmp_product_offers_head_price_wr > div > div.cmp_product_offers_head_price.w-100.text-center > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/australijski-kangur/1-uncja-australijski-kangur-zlota-moneta-mieszane-roczniki/'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/krugerrand/1-uncja-krugerrand-zlota-moneta-mieszane-roczniki/'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/lisc-klonowy/1-uncja-lisc-klonowy-zlota-moneta-mieszane-roczniki/'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/britannia/1-uncja-britannia-karol-iii-zlota-moneta-2023/'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/wiedenscy-filharmonicy/1-uncja-filharmonicy-wiedenscy-zlota-moneta-2023/'
      },
      {
        name: coins.AMERICAN_EAGLE,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/amerykanski-orzel/1-uncja-amerykanski-orzel-zlota-moneta-2023/'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/pl/zlote-monety/amerykanski-bizon/1-uncja-amerykanski-bizon-zlota-moneta-2023/'
      },
    ]);
  }
}

export default ShopCoinInvest;
