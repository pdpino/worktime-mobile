import { createSelector } from 'reselect';

const subjectFromPropsSelector = (_, props) => props.subject;

const workSessionsSelector = createSelector(
  subjectFromPropsSelector,
  subject => subject.workSessions.toRefArray(),
);

export default workSessionsSelector;
