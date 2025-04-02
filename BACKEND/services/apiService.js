// backend/services/apiService.js
const axios = require('axios');
const STOCK_API_KEY = process.env.STOCK_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY;

// Get Stock Data
async function getStockData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${STOCK_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}

// Get News Data
async function getNews() {
  const url = `https://newsapi.org/v2/everything?q=finance&apiKey=${NEWS_API_KEY}`;
  const response = await axios.get(url);
  return response.data.articles;
}

// Get Currency Exchange Rates
async function getCurrencyRates(base = 'USD') {
  const url = `https://openexchangerates.org/api/latest.json?app_id=${CURRENCY_API_KEY}`;
  const response = await axios.get(url);
  return response.data.rates;
}

module.exports = { getStockData, getNews, getCurrencyRates };
