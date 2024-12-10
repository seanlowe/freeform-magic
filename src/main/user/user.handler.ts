/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain } from 'electron'
import { CreateUserDto } from './create-user.dto'
import { User } from './user.object'
import UserRepository from './user.repository'

ipcMain.handle( 'user:getUser', async ( event, username: string ) => {
  return await UserRepository.getUser( username )
})

ipcMain.handle( 'user:createUser', async ( event, createUserDto: CreateUserDto ) => {
  // const user = new User( createUserDto.username, createUserDto.password )
  // await UserRepository.createUser( user )
})

ipcMain.handle( 'user:deleteUser', async ( event, username: string ) => {
  await UserRepository.deleteUser( username )
})

