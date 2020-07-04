import 'reflect-metadata';
import 'antd/dist/antd.css';
import Cookie from 'js-cookie';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router5';

import { router } from '&front/application/router';
import { Application } from '&front/Application';

import { initializeStore } from './domain/store/initializeStore';
import { tokenChanged } from './application/viewer';
import { errorHappened, somethingHappened } from './application/notify';

const reduxStore = initializeStore();

tokenChanged(Cookie.get('token') || null);

function Root() {
  useEffect(() => {
    const subscribtionToErorrs = errorHappened.watch((message) =>
      notification.error({ message }),
    );
    const subscribtionToInfo = somethingHappened.watch((message) =>
      notification.info({ message }),
    );

    return () => {
      subscribtionToErorrs.unsubscribe();
      subscribtionToInfo.unsubscribe();
    };
  }, []);

  return (
    <Provider store={reduxStore}>
      <RouterProvider router={router}>
        <Application />
      </RouterProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('app'));
