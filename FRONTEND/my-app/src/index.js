import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style.css';
import App from './App';
import { AuthProvider } from './context/AuthContexts';
import './styles.css';
import './Styles/global.css';



import { TransactionProvider } from './context/transactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </AuthProvider>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

