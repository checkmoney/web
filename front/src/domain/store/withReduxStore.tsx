import React from 'react'

import { AppContext } from '../AppContext'
import { getOrCreateStore } from './getOrCreateStore'
import { Store } from './Store'

import { NextAppContext } from 'next/app'

export const withReduxStore = (App: any) => {
  return class AppWithRedux extends React.Component {
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
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
