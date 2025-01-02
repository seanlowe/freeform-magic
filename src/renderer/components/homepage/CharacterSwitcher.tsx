import { Character } from '../../../types'

const CharacterSwitcher = ({
  characters,
  selectedCharacter,
  onSwitch
}: {
  characters: Character[],
  selectedCharacter: Character | null,
  onSwitch: ( character: Character ) => void
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <h3>Character Selector</h3>
      <p>Select your character:</p>
      <select
        onChange={( e ) => {
          return onSwitch( characters[parseInt( e.target.value )] )
        }}
        value={selectedCharacter?.id || ''}
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
