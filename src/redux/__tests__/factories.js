import factory from 'factory-girl';
import Category from '../models/Category';
import Subject from '../models/Subject';
import WorkSession from '../models/WorkSession';

factory.define('Subject', Subject, {
  id: factory.sequence('id', (n) => n),
  name: factory.sequence('name', (n) => `subject ${n}`),
  // Add more attrs if needed
});

factory.define('WorkSession', WorkSession, {
  id: factory.sequence('id', (n) => n),
  // Add more attrs if needed
});

factory.define('Category', Category, {
  id: factory.sequence('id', (n) => n),
  name: factory.sequence('name', (n) => `category ${n}`),
  alias: factory.sequence('name', (n) => `c${n}`),
  // Add more attrs if needed
});

export default factory;
