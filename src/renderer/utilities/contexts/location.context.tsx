import { createContext } from 'react'

export const initialLocationState = 'Home'

const initialLocationDispatch: React.Dispatch<string> = () => {
  return null
}

export const LocationContext = createContext<{
  state: string | null
  dispatch: React.Dispatch<string>
}>({ state: initialLocationState, dispatch: initialLocationDispatch })
