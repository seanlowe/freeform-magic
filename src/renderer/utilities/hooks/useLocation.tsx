import { useState } from 'react'

const useLocation = ( initialState: string ) => {
  const [ state, setState ] = useState<string>( initialState )

  const dispatch = ( page: string ) => {
    setState( page )
  }

  return { state, dispatch }
}

export default useLocation
