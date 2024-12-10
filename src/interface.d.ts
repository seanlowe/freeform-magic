/* eslint-disable no-var */

import { SimpleElectronStore } from './db/store'

export interface IElectronAPI {
  auth: {
    login: ( username: string, password: string ) => Promise<void>,
    logout: () => Promise<void>,
    getCurrentUser: () => Promise<User | null>
  },
  database: {
    users: {
      getUsers: () => Promise<User[]>
    }
  }
}

declare global {
  var store: SimpleElectronStore
  interface Window {
    api: IElectronAPI
  }
}
