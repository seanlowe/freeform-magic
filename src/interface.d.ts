/* eslint-disable no-var */

import { PrismaClient } from '@prisma/client'

import { SimpleElectronStore } from './db'
import type { User } from './main/user/user.object'

// NOTE - did you edit preload.ts as well?
export interface IElectronAPI {
  auth: {
    login: ( username: string, password: string ) => ErrorObject | void,
    logout: () => void,
    getCurrentUser: () => User | null
  },
  database: {
    characters: {
      getCharacters: () => Character[]
      getCharactersByUser: ( username: string ) => Character[]
    },
    spells: {
      getSpells: () => Spell[]
      getSpellsByCharacter: ( characterId: number ) => Spell[]
    },
    users: {
      getUser: ( username: string ) => User | null
      createUser: ( createUserDto: CreateUserDto ) => User
      deleteUser: ( username: string ) => void
    }
  }
}

declare global {
  var store: SimpleElectronStore // for emulating localStorage
  var db: PrismaClient
  interface Window {
    api: IElectronAPI
  }
}
