import * as React from 'react'

import log from '@front/log'
import con from '@shared/module'

import s from './index.css'

export default () => {
  con()
  return <p className={s.title}>{log()}</p>
}
