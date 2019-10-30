import factory from 'factory-girl';
import Subject from '../models/Subject';
import WorkSession from '../models/WorkSession';

factory.define('Subject', Subject, {
  id: factory.sequence('id', n => n),
  name: factory.sequence('name', n => n),
  // Add more attrs if needed
});

factory.define('WorkSession', WorkSession, (options) => {
  const data = {
    id: factory.sequence('id', n => n),
    // Add more attrs if needed
  };
  if (options.device) {
    data.device = options.device;
  }

  return data;
});

export default factory;
