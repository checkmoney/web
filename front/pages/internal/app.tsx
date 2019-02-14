import * as React from 'react'

import { AppContext } from '@front/AppContext'
import { fetchFirstTransactionDate } from '@front/domain/money/actions/fetchFirstTransactionDate'
import { App } from '@front/features/app'

export default class AppPage extends React.Component {
  public static isSecure = true

  public static async getInitialProps({ reduxStore }: AppContext) {
    await reduxStore.dispatch(fetchFirstTransactionDate() as any)

    return {}
  }

  public render() {
    return <App />
  }
}
