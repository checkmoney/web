import { FORBIDDEN } from 'http-status-codes'
import * as React from 'react'

import { AppContext } from '$front/domain/AppContext'
import { Landing } from '$front/features/landing'
import { pageWithTranslation, Namespace } from '$front/domain/i18n'

class ForbiddenPage extends React.Component {
  public static async getInitialProps({ res }: AppContext) {
    res.statusCode = FORBIDDEN

    return {}
  }

  public render() {
    return <Landing forbidden />
  }
}

export default pageWithTranslation(Namespace.Landind)(ForbiddenPage)
