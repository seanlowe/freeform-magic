import { PrismaClient, Spell } from '@prisma/client'

import { checkExistsOrThrow } from '../../src/db'

const spells = [
  {
    name: 'Fireball',
    description: 'A bright streak flashes from your pointing finger to a point you choose...',    
  },
  {
    name: 'Lightning Bolt',
    description: 'A bright streak flashes from your pointing finger to a point you choose...',
  },
  {
    name: 'Cure Wounds',
    description: 'A creature you touch regains hit points equal to...',
  },
  {
    name: 'Greater Cure Wounds',
    description: 'A stronger version of cure wounds.',
  },
  {
    name: 'Antidote',
    description:
      'Dispel poison, disease, blindness, paralysis, and sickness on a creature you touch.',
  },
  {
    name: 'Mage Hand',
    description: 'A spectral, floating hand appears at a point you choose...',
  },
  {
    name: 'Mage Foot',
    description: 'A spectral, floating foot appears at a point you choose...',
  },
  {
    name: 'Mage Head',
    description: 'A spectral, floating head appears around eye level at a point you choose...',
  },
]

const spellSeeder = async ( db: PrismaClient ) => {
  checkExistsOrThrow( db )

  // Prisma does not support nested inserts in createMany
  // insert spells without relationships
  const createdSpells: Spell[] = await db.spell.createManyAndReturn({
    data: spells.map(( spell ) => {
      return {
        ...spell,
        components: '',
      } 
    }),
  })

  // fetch the created spells and connect them to the character
  // const spellIds = await db.spell.findMany({
  //   where: {
  //     name: { in: spells.map(( spell ) => {
  //       return spell.name 
  //     }) },
  //   },
  //   select: { id: true },
  // })
  const spellIds = createdSpells.map(( spell ) => {
    return { id: spell.id }
  })

  console.log( spellIds )


  for ( const spell of spellIds ) {
    await db.spell.update({
      where: {
        id: spell.id
      },
      data: {
        character: {
          connect: { id: 1 },
        }
      }
    })
  }

  // update the character to have the spells
  // await db.character.update({
  //   where: { id: 1 },
  //   data: {
  //     spells: {
  //       connect: spellIds,
  //     },
  //   },
  // })
}

export default spellSeeder
