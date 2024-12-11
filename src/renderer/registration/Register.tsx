import React, { useEffect, useState } from 'react'
import { AuthProps, RegisterFormData } from '../../types'
import ErrorObject from '../../main/error/error.object'

const Register: React.FC<AuthProps> = ({ toggleView }) => {
  const [ formData, setFormData ] = useState<RegisterFormData>({
    name: '',
    username: '',
    password: '',
  })
  const [ error, setError ] = useState<string>( '' )
  const [ confirmPassword, setConfirmPassword ] = useState( '' )
  const [ passwordsMatch, setPasswordsMatch ] = useState( false )

  useEffect(() => {
    setPasswordsMatch( formData.password === confirmPassword )
  }, [ formData.password, confirmPassword ] )

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

    // make sure the user has valid data

    // check if the username is already taken
    // window.api.auth.getUser

    // create the new user
    // window.api.auth.createUser

    // login the new user
    // window.api.auth.login
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        <button type='submit' disabled={!passwordsMatch}>Register</button>
        <p> Already have an account? </p>
        <p><strong><a onClick={() => {
          return toggleView( 'login' ) 
        }} style={{ marginLeft: '16px', cursor: 'pointer' }}>
            ← Back to Login
        </a></strong></p>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default Register

