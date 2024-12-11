export enum userRole {
  player = 'player',
  dungeonMaster = 'dungeonMaster'
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData{
  name: string;
}

export interface AuthProps {
  toggleView: ( view: 'login' | 'register' ) => void;
}
