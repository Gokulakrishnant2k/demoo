// backend/routes/apiRoutes.js
const express = require('express');
const path = require('path');
const { getStockData, getNews, getCurrencyRates } = require(path.resolve(__dirname, '../services/apiService.js'));


const router = express.Router();

// Get Stock Data
router.get('/stock/:symbol', async (req, res) => {
  try {
    const data = await getStockData(req.params.symbol);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching stock data');
  }
});

// Get News
router.get('/news', async (req, res) => {
  try {
    const data = await getNews();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching news');
  }
});

// Get Currency Rates
router.get('/currency', async (req, res) => {
  try {
    const data = await getCurrencyRates();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching currency data');
  }
});

module.exports = router;
