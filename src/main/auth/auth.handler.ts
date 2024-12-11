import { ipcMain } from 'electron'
import AuthRepository from './auth.repository'
import { connectToSignal } from '../handlers/utilities'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
connectToSignal( 'auth:login', async ( event, username: string, password: string ) => {
  AuthRepository.setCurrentUser( username )
})

connectToSignal( 'auth:logout', async () => {
  AuthRepository.clearCurrentUser()
})

ipcMain.handle( 'auth:getCurrentUser', async () => {
  return await AuthRepository.getCurrentUser()
})
