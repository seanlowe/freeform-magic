// wrapper for interacting with the SimpleElectronStore for user data

import { userRole } from '../../types'
import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { User } from './user.object'
import { CreateUserDto } from './create-user.dto'

class UserRepository {
  private static store: SimpleElectronStore = global.store

  static async getUser( username: string ): Promise<User | null> {
    checkStoreExistsOrThrow( this.store )

    const user = await this.store.get( username )
    return user
  }

  static async createUser( userInput: CreateUserDto ): Promise<User> {
    checkStoreExistsOrThrow( this.store )

    const [ first, last ] = userInput.name.split( ' ' )
    const user = new User(
      userInput.username,
      first,
      last ?? '',
      userRole.player,
    )

    this.store.set( user.username, user )

    return user
  }

  static async deleteUser( username: string ): Promise<void> {
    checkStoreExistsOrThrow( this.store )

    this.store.delete( username )
  }
}

export default UserRepository
