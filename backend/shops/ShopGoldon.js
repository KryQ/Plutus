import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopGoldon extends BaseShop {
  constructor() {
    super('GOLDON', "Goldon", 'https://www.goldon.pl');

    this.priceSelector = '#product > div.product-page-card > div.product-details > div.product-buy > aside > div.product__price > p > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlota-moneta-australijski-kangur-1-oz-2023-a.html'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlota-moneta-krugerrand-1-oz-2023-a.html'
      },
    ]);
  }
}

export default ShopGoldon;
