// wrapper for interacting with the SimpleElectronStore for session data
// i.e. auth and the logged in user

import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import ErrorObject from '../error/error.object'
import { User } from '../user/user.object'
import UserRepository from '../user/user.repository'

class AuthRepository {
  private static store: SimpleElectronStore = global.store

  // get current session user
  static getCurrentUser(): User | null {
    checkStoreExistsOrThrow( this.store )

    const result = this.store.get( 'currentUser' )
    if ( !result ) {
      console.log( 'no current user' )
      return null
    }

    const user = UserRepository.getUser( result )
    if ( !user ) {
      throw new Error( 'user not found' )
    }

    return user
  }

  // set current session user
  static setCurrentUser( username: string ): ErrorObject | void {
    checkStoreExistsOrThrow( this.store )

    const user = UserRepository.getUser( username )
    if ( !user ) {
      // throw new Error( 'user not found' )
      return new ErrorObject( '[ AUTH.REPOS ] User cannot be found' )
    }

    this.store.set( 'currentUser', user.username )
  }

  // clear current session user
  static clearCurrentUser(): void {
    checkStoreExistsOrThrow( this.store )

    this.store.delete( 'currentUser' )
  }
}

export default AuthRepository