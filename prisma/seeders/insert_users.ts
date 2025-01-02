import { PrismaClient } from '@prisma/client'

import { checkExistsOrThrow } from '../../src/db'

const users = [
  {
    firstName: 'Sean',
    lastName: 'Lowe',
    username: 'slowe',
    // eslint-disable-next-line max-len
    password: 'fbb68f5cd5f8b981c728fa5add27a2f0:5be0ce7dc612675abdae552aa09c21c39d72f932a5e7d0d03fdd07264feed2b09475761a81ed0920ae88be828bb1fde1b088af1a9d2fd05bcc04ae03fd40e2a5',
    role: 'player',
  },
]

const userSeeder = async ( db: PrismaClient ) => {
  checkExistsOrThrow( db )

  await db.user.upsert({
    where: { username: users[0].username },
    update: {},
    create: {
      ...users[0],
    },
  })
}

export default userSeeder
