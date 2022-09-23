import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={(<div>Loading ~~~~</div>)}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Suspense>
);

reportWebVitals();
