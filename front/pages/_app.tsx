import 'antd/dist/antd.css?CSSModulesDisable'
import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import { Option } from 'tsoption'

import { AppContext } from '@front/domain/AppContext'
import { WithReduxProps } from '@front/domain/store/WithReduxProps'
import { withReduxStore } from '@front/domain/store/withReduxStore'
import { actions } from '@front/domain/user/reducer/data'
import { getToken } from '@front/domain/user/selectors/getToken'
import { pushRoute } from '@front/features/routing'

class CheckmoneyWeb extends App<WithReduxProps> {
  public static async getInitialProps(appContext: NextAppContext) {
    const ctx: AppContext = appContext.ctx as any

    const token = Option.of(ctx)
      .flatMap(context => Option.of(context.req))
      .flatMap(request => Option.of(request.cookies))
      .flatMap(cookies => Option.of(cookies.token))

    if (token.nonEmpty()) {
      ctx.reduxStore.dispatch(actions.setToken(token.get()))
    }

    const isSecure = !!(appContext.Component as any).isSecure
    const loggedIn = getToken(ctx.reduxStore.getState()).nonEmpty()
    if (isSecure && !loggedIn) {
      await pushRoute('/forbidden', Option.of(ctx))
    }

    return App.getInitialProps(appContext)
  }

  public render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial=scale=1" />
        </Head>
        <Provider store={reduxStore}>
          <StoreContext.Provider value={reduxStore}>
            <Component {...pageProps} />
          </StoreContext.Provider>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(CheckmoneyWeb as any)
