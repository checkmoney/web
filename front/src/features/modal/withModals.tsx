import {
  AppComponentType,
  AppProps,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app'
import React from 'react'
import { ModalContextProvider } from './ModalContextProvider'

type NextProps = AppProps & DefaultAppIProps

export const withModals = (Application: AppComponentType<NextProps>) => {
  return class AppWithRedux extends React.Component<NextProps> {
    public static async getInitialProps(appContext: NextAppContext) {
      let appProps = {}
      if (typeof Application.getInitialProps === 'function') {
        appProps = await Application.getInitialProps(appContext)
      }

      return {
        ...appProps,
      }
    }

    public render() {
      return (
        <ModalContextProvider>
          <Application {...this.props} />
        </ModalContextProvider>
      )
    }
  }
}
