import { useState } from 'react'

const useLocation = ( initialState: string | null ) => {
  const [ state, setState ] = useState<string | null>( initialState )

  const dispatch = ( page: string ) => {
    setState( page )
  }

  return { state, dispatch }
}

export default useLocation
