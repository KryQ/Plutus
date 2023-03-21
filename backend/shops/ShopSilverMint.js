import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopSilverMint extends BaseShop {
  constructor() {
    super('SILVER_MINT', "Srebrna Mennica", 'https://srebrnamennica.pl');

    this.priceSelector = '#main > div.container > div.row.pp_stick_parent > div.col-lg-6.col-content > div > div.product-information > div.product-prices > div.product-price > div > span';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/481-zlota-moneta-inwestycyjna-australijski-kangur-2022-1-uncja.html'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/148-zlota-moneta-inwestycyjna-krugerrand-2021-1-uncja.html'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/107-zlota-moneta-inwestycyjna-lisc-klonu-2021-1-uncja.html'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/235-zlota-moneta-inwestycyjna-britannia-2023-1-uncja.html'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/102-zlota-moneta-wiedenscy-filharmonicy-2021-1-uncja.html'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/zlote-monety-inwestycyjne/903-zlota-moneta-inwestycyjna-american-buffalo-2022-1-uncja.html'
      },
    ]);
  }
}

export default ShopSilverMint;
