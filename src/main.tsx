import ReactDOM from 'react-dom';
import React from 'react';

import './styles.css';
import { App } from './App';
import { AppContext } from './common/context/AppContext';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>,
  container
);
