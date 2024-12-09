import React, { useEffect, useState } from 'react'
import { AuthFormData } from '../../types'
import { User } from '../../main/user/user.object'
import ErrorObject from '../../main/error/error.object'

const Auth: React.FC = () => {
  const [ formData, setFormData ] = useState<AuthFormData>({
    name: '',
    username: '',
    password: '',
  })
  const [ view, setView ] = useState<'login' | 'register'>( 'login' )
  const [ currentUser, setCurrentUser ] = useState<User | null>( null )
  const [ confirmPassword, setConfirmPassword ] = useState( '' )
  const [ passwordsMatch, setPasswordsMatch ] = useState( false )
  const [ error, setError ] = useState<string>( '' )

  useEffect(() => {
    window.api.auth.getCurrentUser().then(( user ) => {
      if ( user ) {
        setCurrentUser( user )
      }
    })
  }, [] )

  useEffect(() => {
    if ( view === 'register' ) {
      setPasswordsMatch( formData.password === confirmPassword )
    }
  }, [ formData.password, confirmPassword ] )

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()

    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRegister = async () => {
    // make sure the user has valid data

    // check if the username is already taken
    // window.api.auth.getUser

    // create the new user
    // window.api.auth.createUser

    // login the new user
    // window.api.auth.login
    return
  }

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()

    if ( view === 'register' ) {
      handleRegister()
      return
    }

    const { username, password } = formData
    if ( !username || !password ) {
      return setError( 'Please enter a username and password' )
    }

    // hash password before login
    // const hashedPassword = await crypto.hash( formData.password, 10 )

    const user = await window.api.database.users.getUser( username )
    if ( user === undefined ) {
      // jump to registration page with username prefilled
      setView( 'register' )
      return
    }

    console.log({ user, blah: user instanceof ErrorObject })
    if ( user instanceof ErrorObject ) {
      setError( 'that user cannot be found' )
      return
    }

    window.api.auth.login( username, password )
  }

  // const handleLogout = async () => {
  //   setError( '' )
  //   setFormData({
  //     username: '',
  //     password: '',
  //   })

  //   window.api.auth.logout().then(() => {
  //     return console.log( 'logout' ) 
  //   })
  // }

  const displayRegisterLink = () => {
    return (
      <p> Need an account? <strong><a onClick={() => {
        return setView( 'register' ) 
      }} style={{ marginLeft: '16px', cursor: 'pointer' }}>
        Register
      </a></strong></p>
    )
  }

  const displayLoginLink = () => {
    return (
      <>
        <p> Already have an account? </p>
        <p>
          <strong>
            <a
              onClick={() => {
                // clear the form data
                setConfirmPassword( '' )
                setPasswordsMatch( false )
                setFormData({
                  name: '',
                  username: '',
                  password: '',
                })

                return setView( 'login' )
              }}
              style={{ marginLeft: '16px', cursor: 'pointer' }}
            >
              ← Back to Login
            </a>
          </strong>
        </p>
      </>
    )
  }

  const displayMatchIndicator = () => {
    if ( !confirmPassword ) { 
      return <></>
    }
    
    return (
      <span style={{ marginLeft: '8px', color: passwordsMatch ? 'green' : 'red' }}>
        {passwordsMatch ? '✓' : '✗'}
      </span>
    )
  }

  return (
    <div className='login-container'>
      <h2>{view === 'login' ? 'Log In' : 'Register' }</h2>
      <form onSubmit={handleSubmit}>
        {view === 'register' && (
          <div>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData?.name ?? ''}
              onChange={handleChange}
              required
            />
          </div>
        )}
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
        {view === 'register' && (
          <div>
            <label htmlFor='password'>Confirm Password</label>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <input
                type='password' 
                id='confirm-password'
                name='confirm-password'
                value={confirmPassword ?? ''}
                onChange={( e ) => {
                  return setConfirmPassword( e.target.value )
                }}
                required
              />
              {displayMatchIndicator()}
            </div>
          </div>
        )}
        <button
          type='submit'
          disabled={!passwordsMatch}
        >
          {view === 'login' ? 'Login' : 'Register'}
        </button>
        {view === 'login' ? displayRegisterLink() : displayLoginLink()}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default Auth

