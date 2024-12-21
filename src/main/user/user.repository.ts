import { PrismaClient, User } from '@prisma/client'

import { CreateUserDto } from './create-user.dto'
import { checkExistsOrThrow } from '../../db'
import { userRole } from '../../types'
import AuthService from '../auth/auth.service'

class UserRepository {
  private static db: PrismaClient = global.db

  static async getUsers(): Promise<User[]> {
    checkExistsOrThrow( this.db )

    const users = await this.db.user.findMany()

    return users
  }

  static async getUser( username: string ): Promise<User | null> {
    checkExistsOrThrow( this.db )

    const user = await this.db.user.findFirst({
      where: {
        username,
      },
    })
    if ( !user ) {
      return null
    }

    return user
  }

  static async createUser( userInput: CreateUserDto ): Promise<User> {
    checkExistsOrThrow( this.db )

    // we save the hashed password in the database
    // and only ever compare that against the user's input
    // which means the password is never stored in plain text
    const hashedPassword = await AuthService.hashPassword( userInput.password )

    const [ first, last ] = userInput.name.split( ' ' )
    const user = await this.db.user.create({
      data: {
        username: userInput.username,
        password: hashedPassword,
        firstName: first,
        lastName: last ?? '',
        role: userRole.player,
        // characters: {
        //   createMany: {
        //     data: [],
        //   },
        // },
      }
    })

    return user
  }

  static async deleteUser( username: string ): Promise<void> {
    checkExistsOrThrow( this.db )

    await this.db.user.delete({
      where: {
        username,
      },
    })
  }
}

export default UserRepository
