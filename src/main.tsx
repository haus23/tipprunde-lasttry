import ReactDOM from 'react-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';

import './styles.css';

import { AppContext } from './common/context/AppContext';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AppContext>
          <App />
        </AppContext>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  container
);
