import ReactDOM from 'react-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';

import './styles.css';

import { AppContext } from './common/context/AppContext';
import { App } from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AppContext>
        <App />
      </AppContext>
    </RecoilRoot>
  </React.StrictMode>,
  container
);
