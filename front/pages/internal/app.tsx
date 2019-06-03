import * as React from 'react'

import { AppContext } from '$front/domain/AppContext'
import { fetchFirstTransactionDate } from '$front/domain/money/actions/fetchFirstTransactionDate'
import { fetchTips } from '$front/domain/mind/actions/fetchTips'
import { App } from '$front/features/app'
import { pageWithTranslation, Namespace } from '$front/domain/i18n'

class AppPage extends React.Component {
  public static isSecure = true

  public static async getInitialProps({ reduxStore }: AppContext) {
    await Promise.all([
      reduxStore.dispatch(fetchFirstTransactionDate() as any),
      reduxStore.dispatch(fetchTips() as any),
    ])

    return {}
  }

  public render() {
    return <App />
  }
}

export default pageWithTranslation([
  Namespace.Tips,
  Namespace.Transaction,
  Namespace.CreateTransaction,
  Namespace.Currency,
  Namespace.ShortHistory,
])(AppPage)
