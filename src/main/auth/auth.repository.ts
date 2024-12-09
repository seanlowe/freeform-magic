// wrapper for interacting with the SimpleElectronStore for session data
// i.e. auth and the logged in user

import { checkStoreExistsOrThrow } from '../../db/utilities'
import { store, SimpleElectronStore } from '../../db/store'
import { User } from '../user/user.object'
import UserRepository from '../user/user.repository'

class AuthRepository {
  private static store: SimpleElectronStore
  // private static STORE_KEY = 'auth'

  constructor() {
    AuthRepository.store = store
  }

  // get current session user
  static async getCurrentUser(): Promise<User | null> {
    checkStoreExistsOrThrow( this.store )

    const result = await this.store.get( 'currentUser' )
    if ( result ) {
      return await UserRepository.getUser( result )
    }

    return null
  }

  // set current session user
  static async setCurrentUser( username: string ): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.set( 'currentUser', username )
  }

  // clear current session user
  static async clearCurrentUser(): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    await this.store.delete( 'currentUser' )
  }
}

export default AuthRepository