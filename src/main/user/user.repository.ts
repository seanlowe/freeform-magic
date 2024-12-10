// wrapper for interacting with the SimpleElectronStore for user data

import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { User } from './user.object'

class UserRepository {
  private static store: SimpleElectronStore = global.store

  static async getUser( username: string ): Promise<User | null> {
    checkStoreExistsOrThrow( this.store )

    const user = await this.store.get( username )
    return user
  }

  static async createUser( user: User ): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.set( user.username, user )
  }

  static async deleteUser( username: string ): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.delete( username )
  }
}

export default UserRepository
