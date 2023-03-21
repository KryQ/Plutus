import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopTreasuryMint extends BaseShop {
  constructor() {
    super('TREASURY_MINT', "Mennica Skarbowa", 'https://www.mennicaskarbowa.pl');

    this.priceSelector = '#projector_price_value';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-8444-Moneta-Australijski-Kangur-1-uncja-zlota.html'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-3-Moneta-Krugerrand-1-uncja-zlota.html'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-14-Moneta-Kanadyjski-Lisc-Klonowy-1-uncja-zlota.html'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-7007-Moneta-Britannia-1-uncja-zlota-wysylka-24-h.html'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-16-Moneta-Wiedenscy-Filharmonicy-1-uncja-zlota.html'
      },
      {
        name: coins.AMERICAN_EAGLE,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-6-Moneta-Amerykanski-Orzel-1-uncja-zlota.html'
      },
      {
        name: coins.AMERICAN_BUFFALO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/product-pol-5-Amerykanski-Bizon-1-uncja-zlota.html'
      },
    ]);
  }
}

export default ShopTreasuryMint;
