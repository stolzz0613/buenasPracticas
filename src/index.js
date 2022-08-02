import React from 'react';
import ReactDOM from 'react-dom/client';
import { Battle } from './components';
import './main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Battle />
  </React.StrictMode>
);

