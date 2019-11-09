import orm from '../models/orm';

/**
 * Adapter used with factory-girl
 * See reducers/__tests__/entities.test.js for an example
 *
 * When using this adapter, use only create methods not build methods,
 * otherwise, the factory.cleanUp() method won't work.
 */

export default class ReduxORMAdapter {
  constructor(session) {
    this.session = session || orm.session(orm.getEmptyState());
  }

  build(Model, props) {
    return this.session[Model.modelName].create(props);
  }

  // eslint-disable-next-line class-methods-use-this
  async save(obj) {
    return obj;
  }

  // eslint-disable-next-line class-methods-use-this
  destroy(obj) {
    return obj.delete();
  }
}
