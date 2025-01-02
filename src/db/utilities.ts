import { PrismaClient } from '@prisma/client'

import { SimpleElectronStore } from './store'

let db: PrismaClient
let store: SimpleElectronStore

if ( process.env.NODE_ENV === 'production' ) {
  db = new PrismaClient()
  store = new SimpleElectronStore()
} else {
  // check if there is already a connection to the database
  if ( !global.db ) {
    global.db = new PrismaClient()
  }

  if ( !global.store ) {
    global.store = new SimpleElectronStore()
  }

  db = global.db
  store = global.store
}

const checkExistsOrThrow = ( db: PrismaClient | SimpleElectronStore ): void => {
  if ( db instanceof PrismaClient ) {
    checkDbExistsOrThrow( db )
  }

  if ( db instanceof SimpleElectronStore ) {
    checkStoreExistsOrThrow( db )
  }
}

const checkDbExistsOrThrow = ( db: PrismaClient ): void => {
  if ( !db ) {
    if ( !global.db ) {
      console.error( 'GLOBAL DB NOT FOUND' )
    }

    throw new Error( 'Global Prisma client not initialized' )
  }
}

const checkStoreExistsOrThrow = ( store: SimpleElectronStore ): void => {
  if ( !store ) {
    if ( !global.store ) {
      console.error( 'GLOBAL STORE NOT FOUND' )
    }

    throw new Error( 'SimpleElectronStore not initialized' )
  }
}

const registerSomething = async ( thingToRegister: string ) => {
  await Promise.resolve( new Promise(( resolve ) => {
    return setTimeout( resolve, 1000 ) 
  }))

  console.log( `Registering the ${thingToRegister}. . .` )
}

const registerStore = async () => {
  await registerSomething( 'store' )
}

const registerDb = async () => {
  await registerSomething( 'db' )
}

export { db, store, registerStore, registerDb, checkExistsOrThrow }
