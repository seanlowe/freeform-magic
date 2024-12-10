import { ipcMain } from 'electron'
import AuthRepository from './auth.repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.handle( 'auth:login', async ( event, username: string, password: string ) => {
  AuthRepository.setCurrentUser( username )
})
  
ipcMain.handle( 'auth:logout', async () => {
  AuthRepository.clearCurrentUser()
})

ipcMain.handle( 'auth:getCurrentUser', async () => {
  return await AuthRepository.getCurrentUser()
})
