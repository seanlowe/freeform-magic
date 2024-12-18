import { userRole } from '../../types'

export class User {
  constructor( username: string, firstName: string, lastName: string, role: userRole ) {
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
  }

  public username: string
  public firstName: string
  public lastName: string
  public role: userRole
}