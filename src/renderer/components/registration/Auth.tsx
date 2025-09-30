import React, { useContext, useEffect, useState } from 'react'

import ErrorObject from '../../../main/error/error.object'
import { AuthFormData } from '../../../types'
import { AuthContext } from '../../utilities/contexts/auth.context'

const Auth: React.FC = () => {
  const [ formData, setFormData ] = useState<AuthFormData>({
    name: '',
    username: '',
    password: '',
  })
  const [ view, setView ] = useState<'hidden' | 'login' | 'register'>( 'login' )
  const [ confirmPassword, setConfirmPassword ] = useState( '' )
  const [ passwordsMatch, setPasswordsMatch ] = useState( false )
  const [ error, setError ] = useState<string>( '' )
  const { state, dispatch } = useContext( AuthContext )

  useEffect(() => {
    if ( !state.currentUser ) {
      setView( 'login' )
    }

  }, [ state.currentUser ] )

  useEffect(() => {
    if ( view === 'register' ) {
      setPasswordsMatch( formData.password === confirmPassword )
    }
  }, [ formData.password, confirmPassword ] )

  useEffect(() => {
    if ( window.env.SKIP_LOGIN ) {
      doLogin( window.env.SKIP_LOGIN_USERNAME ?? '', window.env.SKIP_LOGIN_PASSWORD ?? '' )
    }
  }, [ window.env.SKIP_LOGIN ] )

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()

    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setConfirmPassword( '' )
    setPasswordsMatch( false )
    setFormData({
      name: '',
      username: '',
      password: '',
    })
  }

  const doLogin = async ( username: string, password: string ) => {
    // add password obfuscation here
    const didLogin = await dispatch({ type: 'LOGIN', payload: {
      username: username,
      password: password
    } })

    // if the login failed, set the error
    if ( didLogin !== undefined && typeof didLogin === 'object' ) {
      setError(( didLogin as ErrorObject ).message )
      return
    }

    clearFormData()
    setView( 'hidden' )
    setError( '' )
  }

  const handleRegister = async () => {
    // make sure the user has valid data
    if ( !formData.username || !formData.password || !formData.name ) {
      return setError( 'Please enter a username and password' )
    }

    // check if the username is already taken
    const user = await window.api.database.users.getUser( formData.username )
    if ( user ) {
      setError( 'a user with that username already exists' )
      return
    }

    // create the new user
    const newUser = await window.api.database.users.createUser( formData )

    // login the new user
    await doLogin( newUser.username, formData.password )

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
      setError( 'Please enter a username and password' )
      return
    }

    const user = await window.api.database.users.getUser( username )
    if ( user === undefined || user === null ) {
      // jump to registration page with username prefilled
      setView( 'register' )
      return
    }

    if ( user instanceof ErrorObject ) {
      setError( 'that user cannot be found' )
      return
    }

    await doLogin( username, password )
  }

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
                clearFormData()
                setView( 'login' )

                return
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

