import React from 'react'

import { Character } from '../../../types'

interface CharacterSheetProps {
  character: Character;
}

// id: number
// name: string
// stats: CharacterStatistics
// proficiencies: CharacterProficiencies
// spells: Spell[]

const CharacterSheet: React.FC<CharacterSheetProps> = ({
  character
  // name,
  // // classAndLevel,
  // abilityScores,
  // features,
}) => {
  const { name, stats } = character
  // const statNames = Object.keys( stats )

  return (
    <div className='character-sheet'>
      <header className='character-header'>
        <h1>{name}</h1>
        {/* <h2>{classAndLevel}</h2> */}
      </header>
      <section className='ability-scores'>
        <h3>Ability Scores</h3>
        <div className='scores-grid'>
          {Object.entries( stats ).map(( [ name, score ] ) => {
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
