export interface IElectronAPI {
  // loadPreferences: () => Promise<void>,
  auth: {
    login: ( username: string, password: string ) => Promise<void>,
    logout: () => Promise<void>,
    getCurrentUser: () => Promise<User | null>
  },
  database: {
    users: {
      getUsers: () => Promise<User[]>
    }
  }
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
