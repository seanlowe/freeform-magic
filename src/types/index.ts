import { User } from '../main/user/user.object'

export enum userRole {
  player = 'player',
  dungeonMaster = 'dungeonMaster'
}

export enum CharacterStat {
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
}

export interface AuthFormData {
  name: string
  username: string
  password: string
}

export interface AuthProps {
  toggleView: ( view: 'login' | 'register' ) => void
}

export interface AuthState {
  currentUser: User | null
}

export type AuthAction =
  | { type: 'LOGIN'; payload: { username: string, password: string } }
  | { type: 'LOGOUT' }

export interface Spell {
  name: string;
  description: string;
  id: number;
}

export interface CharacterStatistics {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export interface CharacterProficiencies {
  // Strength
  athletics: number

  // Dexterity
  acrobatics: number
  sleightOfHand: number
  stealth: number

  // Intelligence
  arcana: number
  history: number
  investigation: number
  nature: number
  religion: number

  // Wisdom
  animalHandling: number
  insight: number
  medicine: number
  perception: number
  survival: number

  // Charisma
  deception: number
  intimidation: number
  performance: number
  persuasion: number
}

export interface Character {
  id: number
  name: string
  stats: CharacterStatistics
  proficiencies: CharacterProficiencies
}
