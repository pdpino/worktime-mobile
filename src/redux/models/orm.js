import { ORM } from 'redux-orm';
import Subject from './Subject';
import WorkSession from './WorkSession';

const orm = new ORM();
orm.register(
  Subject,
  WorkSession,
);

export default orm;
