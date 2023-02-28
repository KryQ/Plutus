import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopApartMint extends BaseShop {
  constructor() {
    super('NOBLE_INVESTMENTS', "Szlachetne Inwestycje", 'https://sklep.szlachetneinwestycje.pl');

    this.priceSelector = 'p.price > span > bdi';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/produkty/australijski-kangur-1-uncja-zlota-2023/'
      },
      {
        name: coins.KRUGERRAND,
        path: '/produkty/krugerrand-1-uncja-zlota-2022-2/'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/produkty/kanadyjski-lisc-klonowy-1-uncja-zlota-2022-3/'
      },
      {
        name: coins.BRITANNIA,
        path: '/produkty/britannia-1-uncja-zlota-2023/'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/produkty/amerykanski-orzel-1-uncja-zlota-2021-2/'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        path: '/produkty/amerykanski-bizon-1-uncja-zlota-2021/'
      },
    ]);
  }
}

export default ShopApartMint;
