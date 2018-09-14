import { createSelector } from 'reselect';
import { createOrmSelector, ormSessionSelector } from './orm';

const subjectFromPropsSelector = (_, props) => props.subject;

export const subjectSessionsSelector = createSelector(
  subjectFromPropsSelector,
  subject => subject.worksessionSet.toModelArray()
    .sort((ws1, ws2) => ws2.timestampStart - ws1.timestampStart),
);

export const lastWorkSessionSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.WorkSession.all().last(),
);
