import {  PrismaClient, User } from '@prisma/client'

import AuthService from './auth.service'
import { SimpleElectronStore, checkExistsOrThrow } from '../../db'
import ErrorObject from '../error/error.object'
import UserRepository from '../user/user.repository'

class AuthRepository {
  private static db: PrismaClient = global.db
  private static store: SimpleElectronStore = global.store

  // get current session user
  static async getCurrentUser(): Promise<User | null> {
    checkExistsOrThrow( this.db )
    checkExistsOrThrow( this.store )

    const username = this.store.get( 'currentUser' )

    if ( !username ) {
      console.log( '[ AUTH.REPOS ] No current user in session' )
      return null
    }

    const user = await UserRepository.getUser( username )
    if ( !user ) {
      throw new ErrorObject( 'user not found' )
    }

    return user
  }

  // set current session user
  static async setCurrentUser( username: string, password: string ): Promise<ErrorObject | void> {
    checkExistsOrThrow( this.db )
    checkExistsOrThrow( this.store )

    const user = await UserRepository.getUser( username )
    if ( !user ) {
      return new ErrorObject( '[ AUTH.REPOS ] User cannot be found' )
    }

    const passwordsMatch = await AuthService.verifyPassword( password, user.password )
    if ( !passwordsMatch ) {
      return new ErrorObject( '[ AUTH.REPOS ] Password does not match' )
    }

    this.store.set( 'currentUser', user.username )
  }

  // clear current session user
  static clearCurrentUser(): void {
    checkExistsOrThrow( this.store )

    this.store.delete( 'currentUser' )
  }
}

export default AuthRepository
