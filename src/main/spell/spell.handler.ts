import SpellRepository from './spell.repository'
import { importAll5eSpells } from './spell.service'
import { connectToSignal } from '../handlers/utilities'

connectToSignal( 'spell:getSpells', async () => {
  return SpellRepository.getSpells()
})

connectToSignal( 'spell:getSpellsByCharacter', async ( event, characterId: number ) => {
  return SpellRepository.getSpellsForCharacter( characterId )
})

connectToSignal( 'spell:importSpells', async () => {
  return importAll5eSpells()
})
