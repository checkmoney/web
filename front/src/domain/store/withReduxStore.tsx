import App, { AppProps, DefaultAppIProps, NextAppContext } from 'next/app'
import React, { ComponentType } from 'react'

import { AppContext } from '../AppContext'
import { getOrCreateStore } from './getOrCreateStore'
import { Store } from './Store'
import { WithReduxProps } from './WithReduxProps'

type NextProps = AppProps & DefaultAppIProps

export const withReduxStore = (
  Application: ComponentType<NextProps & WithReduxProps>,
) => {
  return class AppWithRedux extends React.Component<NextProps> {
    public static async getInitialProps(appContext: NextAppContext) {
      const reduxStore = getOrCreateStore()
      const context: AppContext = appContext.ctx as any

      context.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    private reduxStore: Store

    constructor(props: any) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    public render() {
      return <Application {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
