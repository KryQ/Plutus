import $ from "cheerio";

class BaseShop {
  id = null;
  name = null;
  address = null;
  coins = [];
  priceSelector = null;

  /**
   * @param address - Address of the shop
   * @param {Object[]} coins - List of coins handled by the shop
   * @param {string} coins[].name - Name of the coin
   * @param {string} coins[].path - Name of the coin
   */
  constructor(id, name, address) {
    if (!address || !name || !name) {
      throw new Error('Shop address, name, id must be provided');
    }

    this.id = id;
    this.name = name;
    this.address = address;
  }

  setHandledCoin(coins) {
    this.coins = coins;
  }

  async _scrapePrice(path, selector) {
    const data = await fetch(this.address + path);
    const site = await data.text();

    const rawPrice = $(selector, site).text();
    const price = parseFloat(rawPrice.replace(/[^0-9,.]+/g, '').replace(',', '.'));

    if (!price) {
      throw new Error(`[${this.id}] Price couldn't be obtained`);
    }

    return price;
  }

  async getCoinPrice(coin) {
    const handledCoin = this.coins.find(handledCoin => handledCoin.name === coin);

    if (!handledCoin) {
      throw new Error(`Coin not handled by this shop: ${coin}`);
    }

    return {
      price: await this._scrapePrice(handledCoin.path, this.priceSelector),
      type: handledCoin.type,
      material: handledCoin.material,
      currency: handledCoin.currency,
    };
  }

  getAllHandledCoinPrices() {
    return Promise.all(this.coins.map(async coin => {
      return {
        name: coin.name,
        price: await this._scrapePrice(coin.path, this.priceSelector)
      }
    }))
  }
}

export default BaseShop
