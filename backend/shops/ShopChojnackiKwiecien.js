import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopApartMint extends BaseShop {
  constructor() {
    super('CHOJNACKI_KWIECIEN', "Chojnacki & Kwiecień", 'https://chojnackikwiecien.pl');

    this.priceSelector = 'div.columns-in.row > div.summary.entry-summary.medium-6.small-12.columns.product-images > p > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/product/kangur-australijski-uncja/'
      },
      {
        name: coins.KRUGERRAND,
        path: '/product/krugerrand_uncja_zlota/'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/product/mapleleaf_uncja_zlota/'
      },
      {
        name: coins.BRITANNIA,
        path: '/product/britannia-1-uncja-zlota/'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        path: '/product/wiener-philharmoniker-1-uncja-zlota/'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/product/american-eagle-1-uncja-zlota/'
      },
    ]);
  }
}

export default ShopApartMint;
