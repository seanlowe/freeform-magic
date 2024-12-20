import { connectToSignal } from '../handlers/utilities'
import CharacterRepository from './character.repository'

// NOTE - keep in parity with preload.ts and interface.d.ts
connectToSignal( 'character:getCharactersByUser', async ( event, username: string ) => {
  return CharacterRepository.getCharactersByUser( username )
})
