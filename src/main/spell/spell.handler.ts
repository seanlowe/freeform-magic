import SpellRepository from './spell.repository'
import { connectToSignal } from '../handlers/utilities'

connectToSignal( 'spell:getSpellsByCharacter', async ( event, characterId: number ) => {
  return SpellRepository.getSpellsForCharacter( characterId )
})
