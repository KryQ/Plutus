import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopGoldenmark extends BaseShop {
  constructor() {
    super('GOLDENMARK', "Goldenmark", 'https://goldenmark.com');

    this.priceSelector = '#main > div:nth-child(2) > div > div.col-lg-6.col-xs-12.description-col > div.product-prices > div.product-price.h5 > div > span';

    this.coins = [
      {
        name: coins.KANGAROO,
        path: '/pl/australijski-kangur-1-uncja-zlota/#/284-cennik-45_dni'
      },
      {
        name: coins.KRUGERRAND,
        path: '/pl/krugerrand-1-uncja-zlota/#/284-cennik-45_dni'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/pl/kanadyjski-lisc-klonowy-1-uncja-zlota/#/284-cennik-45_dni'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        path: '/pl/wiedenscy-filharmonicy-1-uncja-zlota/#/2272-cennik-29_dni'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/pl/amerykanski-orzel-2021-1-uncja-zlota/#/282-cennik-1_dzien'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        path: '/pl/amerykanski-bizon-1-uncja-zlota/#/2272-cennik-29_dni'
      },
    ];
  }
}

export default ShopGoldenmark;
