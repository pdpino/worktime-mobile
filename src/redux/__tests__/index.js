/**
 * Redux test utilities
 */

import ReduxORMAdapter from './adapter';
import factory from './factories';

export {
  ReduxORMAdapter,
  factory,
};

export function getORMFactory(session) {
  factory.setAdapter(new ReduxORMAdapter(session));
  return factory;
}
