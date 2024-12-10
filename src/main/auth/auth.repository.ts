// wrapper for interacting with the SimpleElectronStore for session data
// i.e. auth and the logged in user

import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { User } from '../user/user.object'
import UserRepository from '../user/user.repository'

class AuthRepository {
  private static store: SimpleElectronStore = global.store

  // get current session user
  static async getCurrentUser(): Promise<User | null> {
    checkStoreExistsOrThrow( this.store )

    const result = await this.store.get( 'currentUser' )
    if ( !result ) {
      console.log( 'no current user' )
      return null
    }

    const user = await UserRepository.getUser( result )
    if ( !user ) {
      console.log( 'user not found' )
      return null 
    }

    return user
  }

  // set current session user
  static async setCurrentUser( username: string ): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.set( 'currentUser', username )
  }

  // clear current session user
  static async clearCurrentUser(): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.delete( 'currentUser' )
  }
}

export default AuthRepository