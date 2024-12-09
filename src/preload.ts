// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


import { contextBridge, ipcRenderer } from 'electron'
import { CreateUserDto } from './main/user/create-user.dto'

contextBridge.exposeInMainWorld( 'api', {
  auth: {
    login: async ( username: string, password: string ) => {
      return await ipcRenderer.invoke( 'auth:login', username, password )
    },
    logout: async () => {
      return await ipcRenderer.invoke( 'auth:logout' )
    },
    getCurrentUser: async () => {
      return await ipcRenderer.invoke( 'auth:getCurrentUser' )
    }
  },
  database: {
    users: {
      getUsers: async () => {
        return await ipcRenderer.invoke( 'users:getUsers' )
      },
      createUser: async ( createUserDto: CreateUserDto ) => {
        return await ipcRenderer.invoke( 'users:createUser', createUserDto )
      },
      deleteUser: async ( username: string ) => {
        return await ipcRenderer.invoke( 'users:deleteUser', username )
      },
    }
  }
})
