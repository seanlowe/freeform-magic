import { ipcMain } from 'electron'
import AuthRepository from './auth.repository'

ipcMain.handle( 'auth:login', async ( event, username: string, password: string ) => {
  console.log( `auth:login from auth.handler.ts ${username}` )

  AuthRepository.setCurrentUser( username )
})
  
ipcMain.handle( 'auth:logout', async () => {
  console.log( 'auth:logout from auth.handler.ts' )
  AuthRepository.clearCurrentUser()
})

ipcMain.handle( 'auth:getCurrentUser', async () => {
  console.log( 'auth:getCurrentUser from auth.handler.ts' )
  return await AuthRepository.getCurrentUser()
})
