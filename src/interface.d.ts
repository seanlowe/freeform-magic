/* eslint-disable no-var */

import { SimpleElectronStore } from './db/store'
import type { User } from './main/user/user.object'

// NOTE - did you edit preload.ts as well?
export interface IElectronAPI {
  auth: {
    login: ( username: string, password: string ) => void,
    logout: () => void,
    getCurrentUser: () => User | null
  },
  database: {
    characters: {
      getCharacters: () => Character[]
      getCharactersByUser: ( username: string ) => Character[]
    },
    users: {
      getUser: ( username: string ) => User | null
      createUser: ( createUserDto: CreateUserDto ) => User
      deleteUser: ( username: string ) => void
    }
  }
}

declare global {
  var store: SimpleElectronStore
  interface Window {
    api: IElectronAPI
  }
}
