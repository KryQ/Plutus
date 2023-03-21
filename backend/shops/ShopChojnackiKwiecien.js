import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";

class ShopChojnackiKwiecien extends BaseShop {
  constructor() {
    super('CHOJNACKI_KWIECIEN', "Chojnacki & Kwiecień", 'https://chojnackikwiecien.pl');

    this.priceSelector = 'div.columns-in.row > div.summary.entry-summary.medium-6.small-12.columns.product-images > p > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/kangur-australijski-uncja/'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/krugerrand_uncja_zlota/'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/mapleleaf_uncja_zlota/'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/britannia-1-uncja-zlota/'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/wiener-philharmoniker-1-uncja-zlota/'
      },
      {
        name: coins.AMERICAN_EAGLE,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        path: '/product/american-eagle-1-uncja-zlota/'
      },
    ]);
  }
}

export default ShopChojnackiKwiecien;
