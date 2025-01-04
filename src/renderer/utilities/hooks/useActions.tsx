import { useState } from 'react'

const useActions = ( initialState: boolean ) => {
  const [ state, setState ] = useState<boolean>( initialState )

  const dispatch = ( newActionStatus: boolean ) => {
    setState( newActionStatus )
  }

  return { state, dispatch }
}

export default useActions
