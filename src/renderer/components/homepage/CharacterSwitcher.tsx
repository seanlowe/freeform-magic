import { Character } from '../../../types'

const CharacterSwitcher = ({
  characters,
  selectedCharacterId,
  onSwitch
}: {
  characters: Character[],
  selectedCharacterId: number | null,
  onSwitch: ( characterId: number ) => void
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <h3>Character Selector</h3>
      <p>Select your character:</p>
      <select
        onChange={( e ) => {
          return onSwitch( Number( e.target.value ))
        }}
        value={selectedCharacterId || ''}
      >
        <option value='' disabled>Select a character</option>
        {characters.map(( character ) => {
          return (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CharacterSwitcher
