import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import React, { Component as ReactComponent } from 'react'
import { Provider } from 'react-redux'

import { AppContext } from '@front/domain/AppContext'
import { Store } from '@front/domain/store/Store'
import { withReduxStore } from '@front/domain/store/withReduxStore'

interface Props {
  reduxStore: Store
  pageProps: any
  Component: ReactComponent
}

class OncohelpWeb extends App<Props> {
  public static getInitialProps(context: NextAppContext) {
    const ctx: AppContext = context.ctx as any

    if (ctx.req && ctx.req.cookies) {
      // TODO: option
      const token: string | undefined = ctx.req.cookies.token

      if (token) {
        // TODO:
        // ctx.reduxStore.dispatch(setToken(token))
      }
    }

    return App.getInitialProps(context)
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

export default withReduxStore(OncohelpWeb)
