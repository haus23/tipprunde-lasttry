import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import './styles.css';

import { AppContext } from './common/context/AppContext';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { SplashScreen } from './common/components/splash-screen/SplashScreen';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<SplashScreen />}>
          <AppContext>
            <App />
          </AppContext>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  container
);
