import React, { useState } from 'react'
import { LoginFormData } from '../../types'

const Login: React.FC<{onLogin: ( username: string | null ) => void }> = ({ onLogin }) => {
  const [ formData, setFormData ] = useState<LoginFormData>({ username: '', password: '' })
  const [ tempFormData, setTempFormData ] = useState<LoginFormData>({ username: '', password: '' })
  const [ role, setRole ] = useState<'Player' | 'Dungeon Master'>( 'Player' )
  const [ error, setError ] = useState<string>( '' )

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()

    const { name, value } = e.target
    setTempFormData(( prevState ) => {
      return {
        ...prevState,
        [name]: value,
      } 
    })
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()

    try {
      // window.database.createUser({ username, password, role });

      alert( 'User created successfully!' )
    } catch ( err ) {
      setError( 'Error creating user' )
    }
    

    setFormData({
      username: tempFormData.username,
      password: tempFormData.password,
    })
  }

  return (
    <div className='login-container'>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={tempFormData.username ?? ''}
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
            value={tempFormData.password ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <select value={role} onChange={( e ) => {
          return setRole( e.target.value as 'Player' | 'Dungeon Master' ) 
        }}>
          <option value='Player'>Player</option>
          <option value='Dungeon Master'>Dungeon Master</option>
        </select>
        <button type='submit'>Register</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default Login

