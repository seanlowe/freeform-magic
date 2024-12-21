import CharacterRepository from './character.repository'
import { connectToSignal } from '../handlers/utilities'

// NOTE - keep in parity with preload.ts and interface.d.ts
connectToSignal( 'character:getCharactersByUser', async ( event, username: string ) => {
  return CharacterRepository.getCharactersByUser( username )
})
