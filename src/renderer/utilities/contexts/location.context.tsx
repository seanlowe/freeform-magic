import { createContext } from 'react'

export const initialLocationState = 'Home'

const initialLocationDispatch: React.Dispatch<string> = () => {
  return 'Home'
}

export const LocationContext = createContext<{
  state: string
  dispatch: React.Dispatch<string>
}>({ state: initialLocationState, dispatch: initialLocationDispatch })
