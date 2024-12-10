// export interface User {
//   id: string;
//   username: string;
//   passwordHash: string; // Store hashed passwords
//   role: 'Player' | 'Dungeon Master';
// }

export enum userRole {
  player = 'player',
  dungeonMaster = 'dungeonMaster'
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface BannerProps {
  username: string | null;
}
