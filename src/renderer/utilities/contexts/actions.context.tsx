import { createContext } from 'react'

export const initialActionsState = false

const initialActionsDispatch: React.Dispatch<boolean> = () => {
  return false
}

/**
 * A context to track whether or not the user has performed an action that will need
 * a data refresh. For example, importing spells from 5e.
 */
export const ActionsContext = createContext<{
  state: boolean
  dispatch: React.Dispatch<boolean>
}>({ state: initialActionsState, dispatch: initialActionsDispatch })
