import React, { useEffect, useState } from 'react'
import { AuthFormData } from '../../types'
// import { User } from '../../main/user/user.object'
import ErrorObject from '../../main/error/error.object'
import { useAuth } from '../utilities/hooks/useAuth'

const Auth: React.FC = () => {
  const [ formData, setFormData ] = useState<AuthFormData>({
    name: '',
    username: '',
    password: '',
  })
  const [ view, setView ] = useState<'hidden' | 'login' | 'register'>( 'login' )
  // const [ currentUser, setCurrentUser ] = useState<User | null>( null )
  const [ confirmPassword, setConfirmPassword ] = useState( '' )
  const [ passwordsMatch, setPasswordsMatch ] = useState( false )
  const [ error, setError ] = useState<string>( '' )
  const { dispatch } = useAuth()

  // useEffect(() => {
  //   window.api.auth.getCurrentUser().then(( user ) => {
  //     if ( user ) {
  //       setCurrentUser( user )
  //     }
  //   })
  // }, [] )

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
    const user = await window.api.database.users.getUser( formData.username )
    if ( user ) {
      setError( 'a user with that username already exists' )
    }

    // create the new user
    const newUser = await window.api.database.users.createUser( formData )
    // console.log({ newUser })

    // login the new user
    await window.api.auth.login( newUser.username, formData.password )
    dispatch({ type: 'LOGIN', payload: {
      username: newUser.username,
      password: formData.password
    } })
    setView( 'hidden' )

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

    await window.api.auth.login( username, password )
    setView( 'hidden' )
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

  if ( view === 'hidden' ) {
    return <></>
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
          disabled={view === 'register' && !passwordsMatch}
        >
          {view === 'login' ? 'Login' : 'Register'}
        </button>
        {view === 'login' ? displayRegisterLink() : displayLoginLink()}
        {error && <div className='error' style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}

export default Auth

