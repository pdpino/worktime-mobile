import { createSelector } from 'reselect';

const subjectFromPropsSelector = (_, props) => props.subject;

// eslint-disable-next-line import/prefer-default-export
export const subjectSessionsSelector = createSelector(
  subjectFromPropsSelector,
  subject => subject.worksessionSet.toModelArray()
    .sort((ws1, ws2) => ws1.timeStart - ws2.timeStart),
);
