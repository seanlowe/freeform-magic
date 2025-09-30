/* eslint-disable @typescript-eslint/no-explicit-any */

import { contextBridge } from 'electron'

import ErrorObject from './main/error/error.object'
import { emitSignal } from './main/handlers/utilities'
import { CreateUserDto } from './main/user/create-user.dto'

/*
 * Note for future debugging:
 * 
 * console.logs don't show in the console because
 * preload.ts runs in an isolated context.
 */

const env: Record<string, string> = {};
for (const arg of process.argv) {
  if (arg.startsWith("--")) {
    const [key, value] = arg.substring(2).split("=");
    env[key] = value;
  }
}

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
      getSpells: async () => {
        return await emitSignal( 'spell:getSpells' )
      },
      getSpellsByCharacter: async ( characterId: number ) => {
        return await emitSignal( 'spell:getSpellsByCharacter', characterId )
      },
      importSpells: async () => {
        return await emitSignal( 'spell:importSpells' )
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

contextBridge.exposeInMainWorld("env", env);
