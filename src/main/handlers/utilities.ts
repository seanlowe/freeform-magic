/* eslint-disable @typescript-eslint/no-explicit-any */

import { ipcMain, ipcRenderer } from 'electron'
import ErrorObject from '../error/error.object'

// new version of connectToSignal that allows returning a value?
export const connectToSignal = async (
  channel: string,
  callback: ( ...args: any[] ) => Promise<ErrorObject | void>,
): Promise<ErrorObject | void> => {
  ipcMain.handle( channel, async () => {
    try {
      const result = await callback()

      if ( result instanceof ErrorObject ) {
        throw result
      }
    } catch ( err ) {
      console.log( '\n\n connectToSignal --> callback error', err )

      return new ErrorObject( '[ MAIN.HANDLERS ] connectToSignal --> callback error' )
    }
  })
}

export const emitSignal = async (
  channel: string,
  ...args: any[]
): Promise<ErrorObject | void> => {
  try {
    const result = await ipcRenderer.invoke( channel, ...args )

    if ( result instanceof ErrorObject ) {
      throw result
    }
  } catch ( err ) {
    console.log( '\n\n emitSignal --> ipcRenderer.invoke error', err )

    return new ErrorObject( '[ MAIN.HANDLERS ] emitSignal --> ipcRenderer.invoke error' )
  }
}
