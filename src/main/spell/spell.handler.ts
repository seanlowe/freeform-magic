import SpellRepository from './spell.repository'
import { connectToSignal } from '../handlers/utilities'

connectToSignal( 'spell:getSpells', async () => {
  return SpellRepository.getSpells()
})

connectToSignal( 'spell:getSpellsByCharacter', async ( event, characterId: number ) => {
  return SpellRepository.getSpellsForCharacter( characterId )
})
