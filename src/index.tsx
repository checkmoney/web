import 'reflect-metadata';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import { router } from '&front/app/router';
import { Application } from '&front/presentation/Application';

import { initializeStore } from './domain/store/initializeStore';

const reduxStore = initializeStore();

function Root() {
  return (
    <Provider store={reduxStore}>
      <RouterProvider router={router}>
        <Application />
      </RouterProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('app'));
