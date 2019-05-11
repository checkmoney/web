import * as React from 'react'

import { Landing } from '@front/features/landing'
import { Namespace } from '@front/domain/i18n'

export default class IndexPage extends React.Component {
  public static async getInitialProps() {
    return {
      namespacesRequired: [Namespace.Landind],
    }
  }

  public render() {
    return <Landing />
  }
}
