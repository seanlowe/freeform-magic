import React from 'react'

import { Character } from '../../../types'

interface CharacterSheetProps {
  character: Character;
  closeModal: () => void;
}

// id: number
// name: string
// stats: CharacterStatistics
// proficiencies: CharacterProficiencies
// spells: Spell[]

const StatNameToAbbreviationMap: Map<string, string> = new Map<string, string>( [
  [ 'strength', 'STR' ],
  [ 'dexterity', 'DEX' ],
  [ 'constitution', 'CON' ],
  [ 'intelligence', 'INT' ],
  [ 'wisdom', 'WIS' ],
  [ 'charisma', 'CHA' ],
] )

const CharacterSheet: React.FC<CharacterSheetProps> = ({
  character,
  closeModal
}) => {
  const { name, stats, proficiencies } = character

  return (
    <div className='character-sheet'>
      <header className='character-header'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginRight: '1rem',
              transform: 'scale(2.5)',
              position: 'relative',
              top: '-0.4rem',
            }}
          >
          ←
          </button>
          <h1>{name}</h1>
        </div>
      </header>
      <section className='ability-scores'>
        <h3>Ability Scores</h3>
        <div className='scores-grid'>
          {Object.entries( stats ).map(( [ name, score ] ) => {
            if ( name === 'id' ) {
              return <></>
            }

            return (
              <div key={name} className='ability-score'>
                <span
                  className='ability-name'
                >
                  {StatNameToAbbreviationMap.get( name )}
                </span>
                <span className='ability-value'>{score}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className='ability-scores'>
        <h3>Proficiencies</h3>
        <div className='scores-grid second-grid'>
          {Object.entries( proficiencies ).map(( [ name, score ] ) => {
            if ( name === 'id' ) {
              return <></>
            }

            return (
              <div key={name} className='ability-score'>
                <span
                  className='ability-name'
                >
                  {name.charAt( 0 ).toUpperCase() + name.slice( 1 )}
                </span>
                <span className='ability-value'>{score}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* <section className='features'>
        <h3>Features & Traits</h3>
        {features.map(({ title, description }, index ) => {
          return (
            <div key={index} className='feature'>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ) 
        })}
      </section> */}
    </div>
  )
}

export default CharacterSheet
