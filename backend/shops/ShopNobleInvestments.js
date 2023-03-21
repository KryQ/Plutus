import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopApartMint extends BaseShop {
  constructor() {
    super('NOBLE_INVESTMENTS', "Szlachetne Inwestycje", 'https://sklep.szlachetneinwestycje.pl');

    this.priceSelector = 'p.price > span > bdi';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/australijski-kangur-1-uncja-zlota-2023/'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/krugerrand-1-uncja-zlota-2022-2/'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/kanadyjski-lisc-klonowy-1-uncja-zlota-2022-3/'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/britannia-1-uncja-zlota-2023/'
      },
      {
        name: coins.AMERICAN_EAGLE,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/amerykanski-orzel-1-uncja-zlota-2021-2/'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkty/amerykanski-bizon-1-uncja-zlota-2021/'
      },
    ]);
  }
}

export default ShopApartMint;
