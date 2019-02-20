import * as React from 'react'

import { Hello } from '@front/features/hello'

export default class HelloPage extends React.Component {
  public static isSecure = true

  public render() {
    return <Hello />
  }
}
