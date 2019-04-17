import * as React from 'react'

import { Manager } from '@front/features/manager'

export default class HisotryPage extends React.Component {
  public static isSecure = true

  public render() {
    return <Manager />
  }
}
