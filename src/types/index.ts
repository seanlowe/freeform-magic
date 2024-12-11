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
