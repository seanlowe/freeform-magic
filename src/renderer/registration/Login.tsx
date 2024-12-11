import React, { useEffect, useState } from 'react'
import { AuthProps, LoginFormData } from '../../types'
import { User } from '../../main/user/user.object'
import ErrorObject from '../../main/error/error.object'

const Login: React.FC<AuthProps> = ({ toggleView }) => {
  const [ formData, setFormData ] = useState<LoginFormData>({ username: '', password: '' })
  const [ currentUser, setCurrentUser ] = useState<User | null>( null )
  const [ error, setError ] = useState<string>( '' )

  useEffect(() => {
    window.api.auth.getCurrentUser().then(( user ) => {
      if ( user ) {
        setCurrentUser( user )
      }
    })
  }, [] )

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()

    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()

    const { username, password } = formData
    if ( !username || !password ) {
      return setError( 'Please enter a username and password' )
    }

    // hash password before login
    // const hashedPassword = await crypto.hash( formData.password, 10 )

    const user = await window.api.database.users.getUser( username )
    // if ( user === undefined ) {
    //   // jump to registration page with username prefilled
    //  return
    // }

    console.log({ user, blah: user instanceof ErrorObject })
    if ( user instanceof ErrorObject ) {
      setError( 'that user cannot be found' )
      return
    }

    window.api.auth.login( username, password )
  }

  const handleLogout = async () => {
    setError( '' )
    setFormData({
      username: '',
      password: '',
    })

    window.api.auth.logout().then(() => {
      return console.log( 'logout' ) 
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
          <p> Need an account? <strong><a onClick={() => {
            return toggleView( 'register' ) 
          }} style={{ marginLeft: '16px', cursor: 'pointer' }}>
            Register
          </a></strong></p>
          {error && <div className='error'>{error}</div>}
        </form>
      )}
    </div>
  )
}

export default Login

