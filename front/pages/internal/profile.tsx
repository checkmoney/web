import * as React from 'react'

import { Profile } from '@front/features/profile'

export default class ProfilePage extends React.Component {
  public static isSecure = true

  public render() {
    return <Profile />
  }
}
