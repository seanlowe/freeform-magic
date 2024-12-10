import { SimpleElectronStore } from './store'

let store: SimpleElectronStore

if ( process.env.NODE_ENV === 'production' ) {
  store = new SimpleElectronStore()
} else {
  // check if there is already a connection to the database
  if ( !global.store ) {
    global.store = new SimpleElectronStore()
  }

  store = global.store
}

const checkStoreExistsOrThrow = ( store: SimpleElectronStore ): void => {
  if ( !store ) {
    if ( !global.store ) {
      console.error( 'GLOBAL STORE NOT FOUND' )
    }


    throw new Error( 'SimpleElectronStore not initialized' )
  }
}

const registerStore = async () => {
  await Promise.resolve( new Promise(( resolve ) => {
    return setTimeout( resolve, 1000 ) 
  }))

  console.log( 'registerStore' )
}

export { store, registerStore, checkStoreExistsOrThrow }