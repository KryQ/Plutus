import Fastify from 'fastify';
import FastifyStatic from '@fastify/static'
import FastifyCors from '@fastify/cors'
import schedule from 'node-schedule';
import _ from 'lodash';

import MGoldPrice from "./models/MGoldPrice.js";
import MInvestmentMetalsPrices from "./models/MInvestmentMetalsPrices.js";
import MExchangeRatio from "./models/MExchangeRatio.js";
import {ECurrencies} from "./models/SharedTypes.js";
import {getGoldPrice, getHistoricPrice} from "./dataProviders/getGoldPrices.js";
import scrapeExchanges from "./dataProviders/scrapeCurrenciesExchangeRates.js";
import getShopsPrices from "./dataProviders/getShopsPrices.js";
import db from "./persistentStorage.js";
import {sub} from "date-fns";
import {Op} from "sequelize";

const isProduction = process.env.NODE_ENV === 'production';

const fastify = Fastify({logger: true});
const publicPath = isProduction ? `${process.cwd()}/backend` : process.cwd();
fastify.register(FastifyStatic, {
  root: `${publicPath}/public`,
  prefix: '/',
})
fastify.register(FastifyCors, {
  origin: true
})

fastify.get('/rest/sync-db', async (req, rep) => {
  if (isProduction) return;

  await MGoldPrice.sync({force: true});
  await MInvestmentMetalsPrices.sync({force: true});
  await MExchangeRatio.sync({force: true});
  rep.send({result: 'ok'})
})

// TODO: For first 3 months we can get 1hr resolution.
fastify.get('/rest/seed-gold-prices', async (req, rep) => {
  if (!isProduction) {
    await MGoldPrice.truncate();
  }

  try {
    await Promise.all(Object.keys(ECurrencies)
        .map(async currency => {
          const {data: historicPrices} = await getHistoricPrice({
            currency,
            period: {
              years: 10
            }
          });

          await MGoldPrice.bulkCreate(historicPrices.map(price => ({
            ask: price.high,
            bid: price.low,
            mid: price.open,
            currency: currency,
            dateTime: price.endDateTime
          })))
        }));
  } catch (e) {
    console.log(e);
  }

  return {status: 'ok'};
});

fastify.get('/rest/investments', async () => {
  const coinPrices = await db.query(
      'select * from "InvestmentMetals" im where "createdAt" in (select max("createdAt") as createdAt from "InvestmentMetals" group by "name", "shop");',
      {
        model: MInvestmentMetalsPrices,
        mapToModel: true,
      })

  return _.groupBy(coinPrices, 'name');
})

fastify.get('/rest/gold/current', async (request) => {
  const goldPrice = await MGoldPrice.findOne({
    where: {
      currency: request.query.currency || 'PLN',
    },
    order: [['dateTime', 'DESC']]
  })

  return goldPrice;
});

fastify.get('/rest/gold', async (request) => {
  const goldPrices = await MGoldPrice.findAll({
    where: {
      currency: request.query.currency || 'PLN',
      dateTime: {[Op.gte]: sub(new Date(), {months: 1})}
    },
    order: [['dateTime', 'ASC']]
  })

  if (goldPrices.length === 0) {
    return {data: []};
  }

  const currentGoldPrice = goldPrices.at(0);

  const lastSamePrice = await MGoldPrice.findOne({
    attributes: ['dateTime'],
    where: {
      mid: {
        [Op.lt]: currentGoldPrice.mid
      },
      dateTime: {[Op.lt]: currentGoldPrice.dateTime},
      currency: request.query.currency || 'PLN',
    }
  })

  return {data: goldPrices, lastSamePrice};
});

const calcRatios = ({from, to, exchange}) => {
  if (from === to) return 1;

  let multiplier = 1;
  if (from.toUpperCase() !== ECurrencies.USD) {
    multiplier = 1 / exchange[from];
  }

  return to.toLowerCase() === 'usd' ? multiplier : exchange[to] * multiplier;
}

fastify.get('/rest/currency', async (request) => {
  let {from, to} = request.query;
  from = from.toLowerCase();
  to = to.toLowerCase();

  if (!Object.keys(ECurrencies).includes(from.toUpperCase()) || !Object.keys(ECurrencies).includes(to.toUpperCase())) {
    throw new Error("Unknown currency");
  }

  const rawExchangeRates = await MExchangeRatio.findAll({
    where: {
      dateTime: {[Op.gte]: sub(new Date(), {months: 1})}
    },
    order: [['dateTime', 'ASC']]
  })

  return rawExchangeRates.map(exchange => ({
    currency: calcRatios({
      from, to, exchange
    }),
    dateTime: exchange.dateTime
  }));
})

const scrapeAndStoreGoldPrices = async () => {
  const goldPrices = await Promise.allSettled([
    getGoldPrice(ECurrencies.PLN),
    getGoldPrice(ECurrencies.USD),
    getGoldPrice(ECurrencies.EUR),
  ]);

  await Promise.all(goldPrices.map(async res => {
    if (res.status !== 'fulfilled') {
      console.log('Price couldnt be got')
    }
    const price = res.value.data;
    try {
      await MGoldPrice.create({
        bid: price.bid,
        ask: price.ask,
        mid: price.mid,
        currency: price.quoteCurrency,
        dateTime: price.dateTime
      })
    } catch (e) {
      // TODO: Send more detailed info
      console.log('Error while adding new gold prices:', e.message);
    }
  }))
};

const scrapeAndStoreExchangeRates = async () => {
  const {rates, timestamp} = await scrapeExchanges();

  await MExchangeRatio.create({
    pln: rates.PLN,
    eur: rates.EUR,
    chf: rates.CHF,
    dateTime: timestamp
  })
};

const scrapeAndStoreShopsPrices = async () => {
  const coins = await getShopsPrices();

  await Promise.all(coins.map(coin => {
    MInvestmentMetalsPrices.create({
      name: coin.name,
      investment: coin.type,
      material: coin.material,
      value: coin.price,
      currency: coin.currency,
      shop: coin.shop
    })
  }))
};

const main = async () => {
  schedule.scheduleJob('*/10 * * * *', scrapeAndStoreExchangeRates)
  //schedule.scheduleJob('*/10 * * * *', scrapeAndStoreGoldPrices)
  //schedule.scheduleJob('*/10 * * * *', scrapeAndStoreShopsPrices)

  await fastify.listen({
    port: 3001,
    host: '0.0.0.0'
  })
}

main();
