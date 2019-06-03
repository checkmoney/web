import 'antd/dist/antd.css?CSSModulesDisable'
import App, { Container, NextAppContext } from 'next/app'
import { Ampa } from '@ampa/nextjs'
import { nextWithQuery } from '@breadhead/use-query'
import { ModalContextProvider } from '@breadhead/use-modal'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import { Option } from 'tsoption'

import { AppContext } from '$front/domain/AppContext'
import { WithReduxProps, withReduxStore } from '$front/domain/store'
import { actions as dataActions } from '$front/domain/user/reducer/data'
import { getToken } from '$front/domain/user/selectors/getToken'
import { pushRoute, routeAnimations } from '$front/features/routing'
import { fetchUserProfile } from '$front/domain/user/actions/fetchUserProfile'
import { appWithTranslation, i18n } from '$front/domain/i18n'
import { Language } from '$shared/enum/Language'

class CheckmoneyWeb extends App<WithReduxProps> {
  public static async getInitialProps(appContext: NextAppContext) {
    const ctx: AppContext = appContext.ctx as any

    const token = Option.of(ctx)
      .flatMap(context => Option.of(context.req))
      .flatMap(request => Option.of(request.cookies))
      .flatMap(cookies => Option.of(cookies.token))

    if (token.nonEmpty()) {
      ctx.reduxStore.dispatch(dataActions.setToken(token.get()))
      await ctx.reduxStore.dispatch(fetchUserProfile() as any)
    }

    const isSecure = !!(appContext.Component as any).isSecure
    const loggedIn = getToken(ctx.reduxStore.getState()).nonEmpty()
    if (isSecure && !loggedIn) {
      await pushRoute('/forbidden', Option.of(ctx))
    }

    // TODO: In future use lang from profile
    i18n.changeLanguage(Language.Ru)

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
    )
  }
}

export default nextWithQuery(withReduxStore(appWithTranslation(
  CheckmoneyWeb,
) as any) as any)
