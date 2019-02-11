import { IncomingMessage, OutgoingMessage } from 'http'

import { Store } from './store/Store'

export interface AppContext {
  reduxStore: Store
  req: IncomingMessage & { cookies: { [key: string]: string } }
  res: OutgoingMessage & { statusCode: number }
}
