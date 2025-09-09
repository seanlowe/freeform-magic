import React, { useState } from 'react'

interface SpinnerProps {
  value?: number;
  onChange?: ( val: number ) => void;
  min?: number;
  max?: number;
  step?: number;
}

// level selection widget
const Spinner: React.FC<SpinnerProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
}) => {
  const [ internal, setInternal ] = useState<number>( value ?? 0 )
  const val = value ?? internal

  const update = ( next: number ) => {
    const clamped = Math.min( max, Math.max( min, next ))
    if ( value === undefined ) {
      setInternal( clamped ) 
    }
    onChange?.( clamped )
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: '1rem',
      width: '100%',
    }}>
      <button
        style={{
          border: '1px solid rgb(204, 204, 204)',
          borderRadius: '25px',
          height: '35px',
          width: '35px',
        }}
        onClick={() => {
          return update( val - step ) 
        }}
      >
        -
      </button>
      <input
        type='number'
        value={val}
        onChange={( e ) => {
          return update( Number( e.target.value )) 
        }}
        style={{
          width: '50px',
          textAlign: 'center',
          height: '30px',
          border: '1px solid rgb(204, 204, 204)',
          borderRadius: '6px',
        }}
      />
      <button
        style={{
          border: '1px solid rgb(204, 204, 204)',
          borderRadius: '25px',
          height: '35px',
          width: '35px',
        }}
        onClick={() => {
          return update( val + step ) 
        }}
      >
        +
      </button>
    </div>
  )
}

export default Spinner
