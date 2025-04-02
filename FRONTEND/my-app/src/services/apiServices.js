import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get Stock Data
export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// Get News Data
export const getNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Get Currency Exchange Rates
export const getCurrencyRates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currency`);
    return response.data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};
