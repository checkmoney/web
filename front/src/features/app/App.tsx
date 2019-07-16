import React from 'react'

import { Container } from '&front/ui/components/layout/container'

import * as styles from './App.css'
import { History } from './features/history'
import { Navigation } from './features/navigation'
import { CreateTransaction } from './features/create/CreateTransaction'
import { Now } from './features/now'

export const App = () => (
  <Container className={styles.app}>
    <Navigation className={styles.nav} />
    <CreateTransaction className={styles.create} />
    <Now className={styles.now} />
    <History className={styles.history} />
  </Container>
)
