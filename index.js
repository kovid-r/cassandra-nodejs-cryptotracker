'use strict'
const { Client } = require("cassandra-driver");
const uuid = require('uuid');
const config = require('config');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const astraConfig = config.get('dbSettings');

/**
 * Gets latest price for a given cryptocurrency
 * @param {*} coinName -- Name of the cryptocurrency
 * @param {*} coinSymbol -- Exchange symbol of the cryptocurrency
 * @return {Object} -- Object representation of the GET API result
 */
async function getCoinPrice(coinName, coinSymbol) {
  const data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
    coin_ids: [coinName]
  });
  const coinList = {};
  const coinData = data.data.tickers.filter(t => t.target == 'USD');
  [
    coinSymbol
  ].forEach((i) => {
    var coinDataFilter = coinData.filter(t => t.base == i);
    var result = coinDataFilter.length == 0 ? [] : coinDataFilter[0];
    coinList[i] = result.last;
  });

  const insertObject = {
    coin: coinName,
    price: coinList[coinSymbol],
    id: uuid.v4(),
    created_at: Date.now()
  };
  return insertObject;
}

/**
 * Writes data to Cassandra
 * @param {Object} insertData -- Object representation of the GET API result
 */
async function writeToCassandra(insertData) {

  const client = new Client(
    astraConfig
  );

  await client.connect();

  const insertQuery = 'INSERT INTO coingecko.coin_prices (id, coin, created_at, price) VALUES (?, ?, ?, ?)';
  const insertQueryParams = [insertData.id, insertData.coin, insertData.created_at, insertData.price];
  await client.execute(insertQuery, insertQueryParams, { prepare: true }).then(result => console.log("Row updated on cluster."));

  await client.shutdown();
}

/**
 * Main method
 * @return {*} 
 */
async function main() {
  const insertData = await getCoinPrice('bitcoin', 'BTC');
  writeToCassandra(insertData);
}

const setIntervalRef = setInterval(main, 10);
setTimeout(() => clearInterval(setIntervalRef), 40000);
