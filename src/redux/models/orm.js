import { ORM } from 'redux-orm';
import Subject from './Subject';
import WorkSession from './WorkSession';
import Sprint from './Sprint';
import Category from './Category';

const orm = new ORM();
orm.register(
  Subject,
  WorkSession,
  Sprint,
  Category,
);

export default orm;
