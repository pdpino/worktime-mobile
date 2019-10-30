// Adapter used with factory-girl
// See reducers/__tests__/entities.test.js for an example

export default class ReduxORMAdapter {
  constructor(session) {
    this.session = session;
  }

  build(Model, props) {
    return this.session[Model.modelName].create(props);
  }

  // eslint-disable-next-line class-methods-use-this
  save(obj) {
    return obj;
  }

  // eslint-disable-next-line class-methods-use-this
  destroy(obj) {
    return obj.delete();
  }
}
