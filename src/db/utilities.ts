import { SimpleElectronStore } from './store'

export const checkStoreExistsOrThrow = ( store: SimpleElectronStore ): void => {
  if ( !store ) {
    throw new Error( 'SimpleElectronStore not initialized' )
  }
}

export const initializeStore = () => {
  if ( !global.store ) {
    global.store = new SimpleElectronStore()
  } else {
    console.log( 'store already initialized' )
  }



  // let store: SimpleElectronStore

  // if ( process.env.NODE_ENV === 'production' ) {
  //   store = new SimpleElectronStore()
  // } else {
  //   // check if there is already a connection to the database
  //   if ( !global.store ) {
  //     global.store = new SimpleElectronStore()
  //   }
  //   store = global.store
  // }

  // module.exports.store = store
}