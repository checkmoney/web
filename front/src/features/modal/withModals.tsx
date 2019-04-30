import {
  AppComponentType,
  AppProps,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app'
import React from 'react'
import { ModalContextProvider } from './ModalContextProvider'

type NextProps = AppProps & DefaultAppIProps

interface QueryProps {
  query: any
}

export const withModals = (Application: AppComponentType<NextProps>) => {
  return class AppWithRedux extends React.Component<NextProps & QueryProps> {
    public static async getInitialProps(appContext: NextAppContext) {
      let appProps = {}
      if (typeof Application.getInitialProps === 'function') {
        appProps = await Application.getInitialProps(appContext)
      }

      const { query } = appContext.router

      return {
        ...appProps,
        query,
      }
    }

    public render() {
      const { query, ...appProps } = this.props

      return (
        <ModalContextProvider initialQuery={query}>
          <Application {...appProps} />
        </ModalContextProvider>
      )
    }
  }
}
