import {coins} from "../constants.js";
import BaseShop from "./BaseShop.js";
import {EInvestments, EMaterials} from "../models/MInvestmentMetalsPrices.js";
import {ECurrencies} from "../models/SharedTypes.js";

class ShopMetalMarket extends BaseShop {
  constructor() {
    super('METAL_MARKET', "Metal Market", 'https://www.metalmarket.eu');

    this.priceSelector = '#projector_price_value';

    this.setHandledCoin([
      {
        name: coins.KANGAROO,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/pl/products/australijski-kangur-1-uncja-zlota-2023-6560.html'
      },
      {
        name: coins.KRUGERRAND,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/pl/products/krugerrand-1-uncja-zlota-2023-7213.html'
      },
      {
        name: coins.CANADIAN_LEAF,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/pl/products/kanadyjski-lisc-klonowy-1-uncja-zlota-2023-7486.html'
      },
      {
        name: coins.BRITANNIA,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/pl/products/britannia-king-charles-iii-1-uncja-zlota-2023-7450.html'
      },
      {
        name: coins.VIENNA_PHILHARMONICS,
        type: EInvestments.BULLION_COIN,
        material: EMaterials.GOLD,
        currency: ECurrencies.PLN,
        path: '/pl/products/wiedenski-filharmonik-1-uncja-zlota-2023-7069.html'
      },
    ]);
  }
}

export default ShopMetalMarket;
