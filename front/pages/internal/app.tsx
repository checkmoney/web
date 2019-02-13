import * as React from 'react'

import { App } from '@front/features/app'

export default class AppPage extends React.Component {
  public static isSecure = true

  public render() {
    return <App />
  }
}
