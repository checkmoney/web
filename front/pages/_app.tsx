import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { Option } from 'tsoption'

import { AppContext } from '@front/domain/AppContext'
import { WithReduxProps } from '@front/domain/store/WithReduxProps'
import { withReduxStore } from '@front/domain/store/withReduxStore'

class CheckmoneyWeb extends App<WithReduxProps> {
  public static getInitialProps(appContext: NextAppContext) {
    const ctx: AppContext = appContext.ctx as any

    const token = Option.of(ctx)
      .map(context => context.req)
      .map(request => request.cookies)
      .map(cookies => cookies.token)

    if (token.nonEmpty()) {
      // TODO:
      // ctx.reduxStore.dispatch(setToken(token))
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
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(CheckmoneyWeb)
