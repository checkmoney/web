import * as React from 'react'

import { Landing } from '@front/features/landing'
import { Namespace, pageWithTranslation } from '@front/domain/i18n'

class IndexPage extends React.Component {
  public render() {
    return <Landing />
  }
}

export default pageWithTranslation(Namespace.Landind)(IndexPage)
