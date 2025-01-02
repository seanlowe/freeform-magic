/* eslint-disable @typescript-eslint/no-explicit-any */

import { contextBridge } from 'electron'

import ErrorObject from './main/error/error.object'
import { emitSignal } from './main/handlers/utilities'
import { CreateUserDto } from './main/user/create-user.dto'

// NOTE - did you edit interface.d.ts as well?
contextBridge.exposeInMainWorld( 'api', {
  // auth.handler.ts
  auth: {
    login: async ( ...args: any[] ): Promise<ErrorObject | void> => {
      const r = await emitSignal( 'auth:login', ...args )

      if ( r !== undefined && typeof r === 'object' ) {
        return r as ErrorObject
      }

      return
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
    spells: {
      getSpellsByCharacter: async ( characterId: number ) => {
        return await emitSignal( 'spell:getSpellsByCharacter', characterId )
      },
    },
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
