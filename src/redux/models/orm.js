import { ORM } from 'redux-orm';
import Subject from './Subject';
import WorkSession from './WorkSession';
import Sprint from './Sprint';

const orm = new ORM();
orm.register(
  Subject,
  WorkSession,
  Sprint,
);

export default orm;
