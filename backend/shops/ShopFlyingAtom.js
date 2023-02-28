import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";

class ShopFlyingAtom extends BaseShop {
  constructor() {
    super('FLYING_ATOM', "FlyingAtom", 'https://flyingatom.gold');

    this.priceSelector = '#main > div > div.col-md-6.pb-right-column > div.product-prices.js-product-prices > div.product-price.h5 > div.current-price > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        path: '/zlote-monety/525-1865-australijski-kangur-2023-1-uncja-zlota.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.KRUGERRAND,
        path: '/zlote-monety/1-1098-krugerrand-1-uncja-zlota-2023.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.CANADIAN_LEAF,
        path: '/zlote-monety/6-1096-lisc-klonowy-2023-1-uncja-zlota.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.BRITANNIA,
        path: '/zlote-monety/524-1863-britannia-2023-1-uncja-zlota-krol-karol-iii.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        path: '/zlote-monety/5-1089-wiedenski-filharmonik-2023-1-uncja-zlota.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.AMERICAN_EAGLE,
        path: '/zlote-monety/8-1485-amerykanski-orzel-1-uncja-zlota.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        path: '/zlote-monety/7-1261-amerykanski-bizon-1-uncja-zlota.html#/4-czas_realizacji_zamowienia-24_godziny'
      },
    ]);
  }
}

export default ShopFlyingAtom;
