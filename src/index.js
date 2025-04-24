import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SearchProvider } from './context/SearchContext';
import { SearchProviderDT } from './context/SearchContextDT';

// ✅ Inserisci dinamicamente lo script Trustpilot nel <head>
const trustpilotScript = document.createElement('script');
trustpilotScript.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
trustpilotScript.async = true;
document.head.appendChild(trustpilotScript);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <SearchProviderDT>
        <App />   
      </SearchProviderDT>   
    </SearchProvider>
  </React.StrictMode>
);

// Performance
reportWebVitals();
