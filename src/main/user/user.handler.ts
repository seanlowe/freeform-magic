/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain } from 'electron'

import { CreateUserDto } from './create-user.dto'
import UserRepository from './user.repository'
import { connectToSignal } from '../handlers/utilities'

// --------------------------------
// user:getUser    -> UserRepository.getUser
// user:createUser -> UserRepository.createUser
// user:deleteUser -> UserRepository.deleteUser
// --------------------------------

// NOTE - keep in parity with preload.ts and interface.d.ts
connectToSignal( 'user:getUser', async ( event, username: string ) => {
  return UserRepository.getUser( username )
})

connectToSignal( 'user:createUser', async ( event, createUserDto: CreateUserDto ) => {
  return UserRepository.createUser( createUserDto )
})

connectToSignal( 'user:deleteUser', async ( event, username: string ) => {
  return UserRepository.deleteUser( username )
})
