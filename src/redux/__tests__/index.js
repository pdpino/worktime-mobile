/**
 * Redux test utilities
 * REVIEW: move this to a more common location? (i.e. outside of redux)
 */

import ReduxORMAdapter from './adapter';
import factory from './factories';
import orm from '../models/orm';
import entities from '../reducers/entities';

export {
  ReduxORMAdapter,
  factory,
};

export function getFactory(session) {
  factory.setAdapter(new ReduxORMAdapter(session));
  return factory;
}

export class FactoryHandler {
  constructor() {
    this.factory = factory;
    this.session = null;
    this.entitiesReducer = entities(orm);
  }

  reset() {
    // REVIEW: is this clean up ok?
    // could it be split into setup and teardown?
    this.factory.cleanUp();
    this.session = orm.session(orm.getEmptyState());
    this.factory.setAdapter(new ReduxORMAdapter(this.session));
  }
}
