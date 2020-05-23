import 'reflect-metadata';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import { RouterProvider } from 'react-router5';

import { router } from '&front/app/router';
import { Application } from '&front/presentation/Application';

import { getOrCreateStore } from './domain/store/getOrCreateStore';

const reduxStore = getOrCreateStore();

function Root() {
  // {/* <Head>
  //     <script src="//unpkg.com/reflect-metadata@0.1.13/Reflect.js" />
  //     <meta name="viewport" content="width=device-width, initial=scale=1" />
  // </Head> */}
  return (
    <Provider store={reduxStore}>
      <StoreContext.Provider value={reduxStore}>
        <RouterProvider router={router}>
          <Application />
        </RouterProvider>
      </StoreContext.Provider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('app'));
