import React, { useEffect, useState } from 'react'
import { LoginFormData } from '../../types'
import { User } from '../../main/user/user.object'

const Login: React.FC = () => {
  const [ formData, setFormData ] = useState<LoginFormData | null>( null )
  const [ currentUser, setCurrentUser ] = useState<User | null>( null )
  const [ error, setError ] = useState<string>( '' )

  useEffect(() => {  
    window.api.auth.getCurrentUser().then(( user ) => {
      setCurrentUser( user )
    })
  }, [] )

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()

    const { name, value } = e.target
    setFormData(( prevState ) => {
      if ( prevState ) {
        return {
          ...prevState,
          [name]: value,
        }
      }
    })
  }

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()

    if ( !formData ) {
      return setError( 'Please enter a username and password' )
    }

    const { username, password } = formData

    if ( !username || !password ) {
      return setError( 'Please enter a username and password' )
    }

    // hash password before login
    // const hashedPassword = await crypto.hash( formData.password, 10 )

    window.api.auth.login( username, password ).then(() => {
      return console.log( 'success' )
    })
  }

  const handleLogout = async () => {
    setError( '' )
    setFormData( null )

    window.api.auth.logout().then(() => {
      return console.log( 'success' ) 
    })
  }

  return (
    <div className='login-container'>
      <h2>{currentUser?.username ? 'Log Out' : 'Login' }</h2>
      {currentUser?.username ? (
        <div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData?.username ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData?.password ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit'>Login</button>
          {error && <div className='error'>{error}</div>}
        </form>
      )}
    </div>
  )
}

export default Login

