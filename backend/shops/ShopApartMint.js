import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopApartMint extends BaseShop {
  constructor() {
    super('APART_MINT', "Apart Mint", 'https://mennica.apart.pl');

    this.priceSelector = '#price > span.value';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/australijski-kangur-1oz/3'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/krugerrand-1oz/5'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/kanadyjski-lisc-klonowy-1oz/1'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/britannia-1oz-2023r/6'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/filharmonik-wiedenski-1oz/2'
      },
      {
        name: coins.AMERICAN_EAGLE,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/amerykanski-orzel-1oz-2022r/4'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/produkt/amerykanski-bizon-1oz/7'
      },
    ]);
  }
}

export default ShopApartMint;
