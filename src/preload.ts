import { contextBridge } from 'electron'

import { emitSignal } from './main/handlers/utilities'
import { CreateUserDto } from './main/user/create-user.dto'

// NOTE - did you edit interface.d.ts as well?
contextBridge.exposeInMainWorld( 'api', {
  // auth.handler.ts
  auth: {
    login: async ( ...args: any[] ) => {
      return await emitSignal( 'auth:login', ...args )
    },
    logout: async () => {
      return await emitSignal( 'auth:logout' )
    },
    getCurrentUser: async () => {
      return await emitSignal( 'auth:getCurrentUser' )
    }
  },
  database: {
    // character.handler.ts
    characters: {
      getCharactersByUser: async ( username: string ) => {
        return await emitSignal( 'character:getCharactersByUser', username )
      },
    },
    // spell.handler.ts
    spells: {},
    // user.handler.ts
    users: {
      getUser: async ( username: string ) => {
        return await emitSignal( 'user:getUser', username )
      },
      createUser: async ( createUserDto: CreateUserDto ) => {
        return await emitSignal( 'user:createUser', createUserDto )
      },
      deleteUser: async ( username: string ) => {
        return await emitSignal( 'user:deleteUser', username )
      },
    },
  }
})
