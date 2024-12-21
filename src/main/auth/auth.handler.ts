/* eslint-disable @typescript-eslint/no-unused-vars */

import AuthRepository from './auth.repository'
import { connectToSignal } from '../handlers/utilities'

connectToSignal( 'auth:login', async ( event, username: string, password: string ) => {
  return AuthRepository.setCurrentUser( username, password )
})

connectToSignal( 'auth:logout', async () => {
  return AuthRepository.clearCurrentUser()
})

connectToSignal( 'auth:getCurrentUser', async () => {
  return AuthRepository.getCurrentUser()
})
