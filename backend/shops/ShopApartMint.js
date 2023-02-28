import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopApartMint extends BaseShop {
  constructor() {
    super('APART_MINT', "Apart Mint", 'https://mennica.apart.pl');

    this.priceSelector = '#price > span.value';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/produkt/australijski-kangur-1oz/3'
      },
      {
        name: coins.KRUGERRAND,
        path: '/produkt/krugerrand-1oz/5'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/produkt/kanadyjski-lisc-klonowy-1oz/1'
      },
      {
        name: coins.BRITANNIA,
        path: '/produkt/britannia-1oz-2023r/6'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        path: '/produkt/filharmonik-wiedenski-1oz/2'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/produkt/amerykanski-orzel-1oz-2022r/4'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        path: '/produkt/amerykanski-bizon-1oz/7'
      },
    ]);
  }
}

export default ShopApartMint;
