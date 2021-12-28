import ReactDOM from 'react-dom';
import React from 'react';

import './styles.css';
import { App } from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);
