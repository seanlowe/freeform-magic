import { PrismaClient } from '@prisma/client'

import { checkExistsOrThrow } from '../../src/db'

const proficiencies = {
  athletics: 10,
  acrobatics: 10,
  sleightOfHand: 10,
  stealth: 10,
  arcana: 10,
  history: 10,
  investigation: 10,
  nature: 10,
  religion: 10,
  animalHandling: 10,
  insight: 10,
  medicine: 10,
  perception: 10,
  survival: 10,
  deception: 10,
  intimidation: 10,
  performance: 10,
  persuasion: 10,
}

const statistics = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
}

const characterSeeder = async ( db: PrismaClient ) => {
  checkExistsOrThrow( db )

  const prof = await db.characterProficiencies.create({
    data: proficiencies
  })

  const stat = await db.characterStatistics.create({
    data: statistics
  })

  await db.character.create({
    data: {
      name: 'Bob',
      userId: 1,
      statsId: stat.id,
      proficienciesId: prof.id,
    }
  })
}

export default characterSeeder
