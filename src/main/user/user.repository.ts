// wrapper for interacting with the SimpleElectronStore for user data

import { userRole } from '../../types'
import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { User } from './user.object'
import { CreateUserDto } from './create-user.dto'

class UserRepository {
  private static store: SimpleElectronStore = global.store

  static getUser( username: string ): User | null {
    checkStoreExistsOrThrow( this.store )

    const user = this.store.get( username )

    return user
  }

  static createUser( userInput: CreateUserDto ): User {
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

  static deleteUser( username: string ): void {
    checkStoreExistsOrThrow( this.store )

    this.store.delete( username )
  }
}

export default UserRepository
