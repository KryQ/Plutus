import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopPolishMint extends BaseShop {
  constructor() {
    super('POLISH_MINT', "Mennica Polska", 'https://www.mennica.com.pl');

    this.priceSelector = '#component_1583509 > div.product_details > div > div:nth-child(3) > div > div.product-buy.clearfix > div.wrapper_product_price > div > div.product_price_value > span > span:nth-child(1)';

    this.setHandledCoin([
      {
        name: coins.KRUGERRAND,
        path: '/produkty-inwestycyjne/produkt-inwestycyjny/krugerrand-1-oz-zlota-moneta-bulionowa'
      },
    ]);
  }
}

export default ShopPolishMint;
