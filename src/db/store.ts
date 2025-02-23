/* eslint-disable @typescript-eslint/no-explicit-any */
// import remote from 'electron'
import * as electron from 'electron'
import * as fs from 'fs'
import * as path from 'path'

class SimpleElectronStore {
  private data: Record<string, any>
  private filePath: string

  constructor( fileName = 'store.json' ) {
    // const { app } = remote
    const { app } = electron
    let userDataPath: string
    
    if ( !app ) {
      // we might be running in a command where the rest of the app is not running
      userDataPath = process.cwd() + '/storage'
    } else {
      userDataPath = app.getAppPath() + '/storage'
    }

    this.filePath = path.join( userDataPath, fileName )

    try {
      // try to read the file and parse it as JSON
      this.data = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ))
    } catch ( error ) {
      // if file read or parse fails, start with an empty object
      this.data = {}
    }
  }

  /**
   * Get a value from the store
   *
   * @param key 
   * 
   * @returns the value
   */
  get( key: string ): any {
    return this.data[key]
  }

  /**
   * Set a value in the store
   * 
   * @param key 
   * @param value
   */ 
  set( key: string, value: any ): void {
    this.data[key] = value
    this.save()
  }

  /**
   * Delete a value from the store
   *
   * @param key 
   */
  delete( key: string ): void {
    delete this.data[key]
    this.save()
  }

  // for debugging purposes
  private getAllData(): Record<string, any> {
    return this.data
  }

  // get all keys in the store
  private getAllKeys(): string[] {
    return Object.keys( this.data )
  }

  // Save the current state to disk
  private save(): void {
    fs.writeFileSync( this.filePath, JSON.stringify( this.data ))
  }
}

export { SimpleElectronStore }
