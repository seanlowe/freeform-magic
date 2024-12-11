import { contextBridge, ipcRenderer } from 'electron'
import { CreateUserDto } from './main/user/create-user.dto'
import { emitSignal } from './main/handlers/utilities'

// NOTE - did you edit interface.d.ts as well?
contextBridge.exposeInMainWorld( 'api', {
  // auth.handler.ts
  auth: {
    login: async ( username: string, password: string ) => {
      await ipcRenderer.invoke( 'auth:login', username, password ).catch(( err ) => {
        console.log( '\n\n PRELOAD -- auth > login' )
        throw err
      })
    },
    logout: async () => {
      return await ipcRenderer.invoke( 'auth:logout' )
    },
    getCurrentUser: async () => {
      return await ipcRenderer.invoke( 'auth:getCurrentUser' )
    }
  },
  database: {
    // user.handler.ts
    users: {
      getUser: async () => {
        return await emitSignal( 'user:getUser' )
      },
      createUser: async ( createUserDto: CreateUserDto ) => {
        return await emitSignal( 'user:createUser', createUserDto )
      },
      deleteUser: async ( username: string ) => {
        return await ipcRenderer.invoke( 'user:deleteUser', username )
      },
    }
  }
})
