import { PrismaClient } from '@prisma/client'

import { checkExistsOrThrow, db, registerDb } from '../src/db'
import characterSeeder from './seeders/insert_characters'
import spellSeeder from './seeders/insert_spells'
import userSeeder from './seeders/insert_users'

type Seeder = ( db: PrismaClient ) => Promise<void>

const seeders = [
  userSeeder,
  characterSeeder,
]

// seeders that need data from the previous seeders to complete
const postSeeders = [
  spellSeeder // relies on data from characterSeeder
]

const run = async ( seedersToRun: Seeder[] ) => {
  seedersToRun.forEach( async ( seeder ) => {
    await seeder( db )
  })
}

const main = async () => {
  // make sure the DB is set up
  await registerDb()

  console.log( 'Seeding DB' )

  // early check for failure to connect to the DB
  checkExistsOrThrow( db )

  console.log( 'Running seeders' )
  await run( seeders )
}

const postMain = async () => {
  console.log( 'Running post-seeders' )

  // early check for failure to connect to the DB
  checkExistsOrThrow( db )

  // wait for the seeder to finish (it's very particular about this)
  await Promise.resolve( new Promise(( resolve ) => {
    return setTimeout( resolve, 500 )
  }))

  await run( postSeeders )
}

// runtime

main().then(() => {
  postMain()
})

