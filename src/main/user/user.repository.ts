// wrapper for interacting with the SimpleElectronStore for user data

import { CreateUserDto } from './create-user.dto'
import { User } from './user.object'
import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { userRole } from '../../types'

/**
 * The user "database" is a key called "users" in the store
 * which is a Record<string, User[]> where the key is 
 * the username and the value is an array of users
 */
class UserRepository {
  private static store: SimpleElectronStore = global.store

  static getUsers(): Record<string, User> {
    checkStoreExistsOrThrow( this.store )

    const users = this.store.get( 'users' )

    return users
  }

  static getUser( username: string ): User | null {
    checkStoreExistsOrThrow( this.store )

    const users = this.getUsers()

    const user = users[username]
    if ( !user ) {
      return null
    }

    return user
  }

  static createUser( userInput: CreateUserDto ): User {
    checkStoreExistsOrThrow( this.store )

    const users = this.getUsers()

    const [ first, last ] = userInput.name.split( ' ' )
    const user = new User(
      userInput.username,
      first,
      last ?? '',
      userRole.player,
      [],
    )

    users[userInput.username] = user

    this.store.set( 'users', users )

    return user
  }

  static deleteUser( username: string ): void {
    checkStoreExistsOrThrow( this.store )

    const users = this.getUsers()
    delete users[username]

    this.store.set( 'users', users )
  }
}

export default UserRepository
