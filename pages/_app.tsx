import 'reflect-metadata';
import 'antd/dist/antd.css?CSSModulesDisable';
import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';

import { WithReduxProps, withReduxStore } from '&front/domain/store';

class CheckmoneyWeb extends App<WithReduxProps> {
  public static async getInitialProps(appContext: NextAppContext) {
    return App.getInitialProps(appContext);
  }

  public render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Head>
          <script src="//unpkg.com/reflect-metadata@0.1.13/Reflect.js" />
          <meta name="viewport" content="width=device-width, initial=scale=1" />
        </Head>
        <Provider store={reduxStore}>
          <StoreContext.Provider value={reduxStore}>
            <Component {...pageProps} />
          </StoreContext.Provider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(CheckmoneyWeb as any);
