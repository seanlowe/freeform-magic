/* eslint-disable no-var */

import { SimpleElectronStore } from './db/store'

// NOTE - did you edit preload.ts as well?
export interface IElectronAPI {
  auth: {
    login: ( username: string, password: string ) => Promise<void>,
    logout: () => Promise<void>,
    getCurrentUser: () => Promise<User | null>
  },
  database: {
    users: {
      getUser: ( username: string ) => Promise<User | null>
      createUser: ( createUserDto: CreateUserDto ) => Promise<User>
      deleteUser: ( username: string ) => Promise<void>
    }
  }
}

declare global {
  var store: SimpleElectronStore
  interface Window {
    api: IElectronAPI
  }
}
