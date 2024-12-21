import crypto from 'crypto'

class AuthService {
  private static readonly HASH_ALGORITHM = 'sha512' // secure algorithm
  private static readonly SALT_LENGTH = 16          // length of the salt
  private static readonly ITERATIONS = 100000       // number of iterations
  private static readonly KEY_LENGTH = 64           // length of the derived key

  public static async hashPassword( password: string ): Promise<string> {
    const salt = crypto.randomBytes( this.SALT_LENGTH ).toString( 'hex' )
    const hash = await new Promise<string>(( resolve, reject ) => {
      crypto.pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.HASH_ALGORITHM,
        ( err, derivedKey ) => {
          if ( err ) {
            reject( err ) 
          }
          resolve( derivedKey.toString( 'hex' ))
        })
    })

    return `${salt}:${hash}`
  }

  public static async verifyPassword( password: string, storedHash: string ): Promise<boolean> {
    const [ salt, originalHash ] = storedHash.split( ':' )
    
    const computedHash = await new Promise<string>(( resolve, reject ) => {
      crypto.pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.HASH_ALGORITHM,
        ( err, derivedKey ) => {
          if ( err ) {
            reject( err ) 
          }
          resolve( derivedKey.toString( 'hex' ))
        })
    })

    return computedHash === originalHash
  }
}

export default AuthService
