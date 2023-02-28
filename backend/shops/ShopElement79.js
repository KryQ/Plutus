import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopElement79 extends BaseShop {
  constructor() {
    super('ELEMENT_79', "79 Element", 'https://79element.pl');

    this.priceSelector = 'div.col.span_7.single_product_right > div.summary.entry-summary > p.price > span > bdi';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/product/zlote-monety-inwestycyjne/zlota-moneta-australijski-kangur-1-oz-2023/'
      },
      {
        name: coins.KRUGERRAND,
        path: '/product/zlote-monety-inwestycyjne/zlota-moneta-krugerrand-1-oz-2023/'
      },
    ]);
  }
}

export default ShopElement79;
