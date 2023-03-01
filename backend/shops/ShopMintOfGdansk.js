import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import $ from "cheerio";

class ShopMintOfGdansk extends BaseShop {
  constructor() {
    super('MINT_OF_GDANSK', "Mint of Gdansk", 'https://mennica-gdanska.pl');

    this.priceSelector = '#add-to-cart-or-refresh > div.product-prices > div > div > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/en/investment-metals/4970-100-australian-kangaroo-2023.html'
      },
      {
        name: coins.KRUGERRAND,
        path: '/en/investment-metals/3910-krugerrand-2022.html'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/en/investment-metals/4971-50-maple-leaf-2023.html'
      },
      {
        name: coins.BRITANNIA,
        path: '/en/investment-metals/4786-100-britannia-2023.html'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        path: '/en/investment-metals/4784-100-euro-vienna-philharmonic-1-oz-au-999-2023.html'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/en/investment-metals/4932-50-american-eagle-2023-24h-.html'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        path: '/en/investment-metals/4914-50-american-buffalo-1-oz-au-999-2023.html'
      },
    ]);
  }

  async _scrapePrice(path, selector) {
    const data = await fetch(this.address + path);
    const site = await data.text();
    const rawPrice = $(selector, site).attr('content');

    return parseFloat(rawPrice);
  }
}

export default ShopMintOfGdansk;
