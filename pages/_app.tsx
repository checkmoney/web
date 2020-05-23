import 'reflect-metadata';
import 'antd/dist/antd.css?CSSModulesDisable';
import { Ampa } from '@ampa/nextjs';
import { ModalContextProvider } from '@breadhead/use-modal';
import { nextWithQuery } from '@breadhead/use-query';
import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import { Option } from 'tsoption';

import { AppContext } from '&front/domain/AppContext';
import { WithReduxProps, withReduxStore } from '&front/domain/store';
import { actions as dataActions } from '&front/domain/user/reducer/data';
import { getToken } from '&front/domain/user/selectors/getToken';
import { pushRoute, routeAnimations } from '&front/features/routing';

class CheckmoneyWeb extends App<WithReduxProps> {
  public static async getInitialProps(appContext: NextAppContext) {
    const ctx: AppContext = appContext.ctx as any;

    const token = Option.of(ctx)
      .flatMap((context) => Option.of(context.req))
      .flatMap((request) => Option.of(request.cookies))
      .flatMap((cookies) => Option.of(cookies.token));

    if (token.nonEmpty()) {
      ctx.reduxStore.dispatch(dataActions.setToken(token.get()));
    }

    const isSecure = !!(appContext.Component as any).isSecure;
    const loggedIn = getToken(ctx.reduxStore.getState()).nonEmpty();
    if (isSecure && !loggedIn) {
      await pushRoute('/forbidden', Option.of(ctx));
    }

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
            <ModalContextProvider pushRoute={pushRoute}>
              <Ampa
                timeout={{ enter: 500, exit: 500 }}
                routeAnimations={routeAnimations}
              >
                <Component {...pageProps} />
              </Ampa>
            </ModalContextProvider>
          </StoreContext.Provider>
        </Provider>
      </Container>
    );
  }
}

export default nextWithQuery(withReduxStore(CheckmoneyWeb as any) as any);
