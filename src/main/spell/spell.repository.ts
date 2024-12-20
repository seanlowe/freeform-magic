import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
// import ErrorObject from '../error/error.object'


class SpellRepository {
  private static store: SimpleElectronStore = global.store
}

export default SpellRepository
