import { FORBIDDEN } from 'http-status-codes'
import * as React from 'react'

import { AppContext } from '@front/domain/AppContext'
import { Landing } from '@front/features/landing'
import { Namespace } from '@front/domain/i18n'

export default class ForbiddenPage extends React.Component {
  public static async getInitialProps({ res }: AppContext) {
    res.statusCode = FORBIDDEN

    return {
      namespacesRequired: [Namespace.Landind],
    }
  }

  public render() {
    return <Landing forbidden />
  }
}
