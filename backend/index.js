import Fastify from 'fastify';
import FastifyStatic from '@fastify/static'
import FastifyCors from '@fastify/cors'
import Datastore from '@seald-io/nedb';
import schedule from 'node-schedule';
import scrapeGoldPrices from './scrapeGoldPrices.js';

const storageLocation = process.env.NODE_ENV === 'production' ? '/data' : '.';
const db = new Datastore({filename: storageLocation + '/data.db'});

const fastify = Fastify({logger: true});
const publicPath = process.env.NODE_ENV === 'production' ? `${process.cwd()}/backend` : process.cwd();
fastify.register(FastifyStatic, {
  root: `${publicPath}/public`,
  prefix: '/',
})
fastify.register(FastifyCors, {
  origin: true
})

fastify.get('/rest/data/newest', async (request, reply) => {
  const data = await db.findAsync({}).sort({timestamp: -1}).limit(1);

  if (data.length === 0) {
    throw new Error('NOT_FOUND');
  }

  return data.at(0);
})

fastify.get('/rest/gold', async (request, reply) => {
  const data = await db.findAsync({}).sort({timestamp: 1})

  return data.map(point => ({price: point.goldPrice, timestamp: point.timestamp}));
});

fastify.get('/rest/data', async (request, reply) => {
  return db.findAsync({}).sort({timestamp: 1});
})

const scrapeAndStorePrices = async () => db.insertAsync(await scrapeGoldPrices());

const main = async () => {
  await db.loadDatabaseAsync();

  schedule.scheduleJob('*/10 * * * *', scrapeAndStorePrices)

  await fastify.listen({port: 3001, host: '0.0.0.0'})
}

main();
