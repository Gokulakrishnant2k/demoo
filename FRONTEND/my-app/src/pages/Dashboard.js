import React, { useEffect, useState, useContext } from 'react';
import { getStockData, getNews, getCurrencyRates } from '../services/apiServices';
import { AuthContext } from '../context/AuthContexts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL'); // Default stock symbol

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchAllData(selectedSymbol);
    }
  }, [user, navigate, selectedSymbol]);

  const fetchAllData = async (symbol) => {
    try {
      setLoading(true);
      await Promise.all([fetchStockData(symbol), fetchNews(), fetchCurrencyRates()]);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async (symbol) => {
    try {
      const data = await getStockData(symbol);
      if (data['Meta Data']) {
        setStockData(data);
      } else {
        setStockData(null);
        console.error('No stock data available for this symbol');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      setStockData(null);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNews();
      if (data.length > 0) {
        setNews(data.slice(0, 5));
      } else {
        setNews([]);
        console.error('No news available');
      }
    } catch (error) {
      console.error('Error fetching news:', error.message);
      setNews([]);
    }
  };

  const fetchCurrencyRates = async () => {
    try {
      const data = await getCurrencyRates();
      if (Object.keys(data).length > 0) {
        setCurrencyRates(data);
      } else {
        setCurrencyRates({});
        console.error('No currency data available');
      }
    } catch (error) {
      console.error('Error fetching currency rates:', error.message);
      setCurrencyRates({});
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value);
  };

  if (!user) {
    return <h2>Please login to view the dashboard.</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Welcome, {user.name}! 🎉</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      <div style={styles.symbolSelector}>
        <label htmlFor="stock-symbol">Choose Stock Symbol: </label>
        <select id="stock-symbol" value={selectedSymbol} onChange={handleSymbolChange} style={styles.select}>
          <option value="AAPL">Apple (AAPL)</option>
          <option value="GOOGL">Google (GOOGL)</option>
          <option value="MSFT">Microsoft (MSFT)</option>
          <option value="AMZN">Amazon (AMZN)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading data... ⏳</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {/* Stock Data */}
          {stockData ? (
            <div style={styles.card}>
              <h2>📈 Stock Data: {stockData['Meta Data']['2. Symbol']}</h2>
              <p>
                Latest Price: $
                {stockData['Time Series (Daily)'][Object.keys(stockData['Time Series (Daily)'])[0]]['4. close']}
              </p>
            </div>
          ) : (
            <p style={{ color: 'red' }}>Stock data not available for {selectedSymbol}.</p>
          )}

          {/* News Section */}
          <div style={styles.card}>
            <h2>📰 Latest News</h2>
            {news.length > 0 ? (
              <ul>
                {news.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No news available.</p>
            )}
          </div>

          {/* Currency Rates */}
          <div style={styles.card}>
            <h2>💱 Currency Exchange Rates (USD)</h2>
            {currencyRates && Object.keys(currencyRates).length > 0 ? (
              <div>
                <p>EUR: {currencyRates['EUR']}</p>
                <p>INR: {currencyRates['INR']}</p>
                <p>GBP: {currencyRates['GBP']}</p>
              </div>
            ) : (
              <p>Currency data not available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
  },
  card: {
    padding: '20px',
    margin: '20px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  symbolSelector: {
    margin: '20px 0',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginLeft: '10px',
  },
};

export default Dashboard;
