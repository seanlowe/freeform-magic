import { User } from '../main/user/user.object'

export enum userRole {
  player = 'player',
  dungeonMaster = 'dungeonMaster'
}

export interface AuthFormData {
  name: string;
  username: string;
  password: string;
}

export interface AuthProps {
  toggleView: ( view: 'login' | 'register' ) => void;
}

export interface AuthState {
  currentUser: User | null;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: { username: string, password: string } }
  | { type: 'LOGOUT' };

export interface Spell {
  name: string;
  description: string;
  id: number;
}

export interface Character {
  id: number;
  name: string;
}
