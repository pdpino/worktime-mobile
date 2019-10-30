import entities from '../entities';
import orm from '../../models/orm';
import { factory, ReduxORMAdapter } from '../../tests';

describe('entities reducer', () => {
  const entitiesReducer = entities(orm);
  const session = orm.session(orm.getEmptyState());
  factory.setAdapter(new ReduxORMAdapter(session));

  afterEach(() => factory.cleanUp());

  describe('Store update from version 0 to 1', () => {
    let initialWorkSessions;
    let workSessions;

    beforeAll(async () => {
      await factory.createMany('WorkSession', 7);
      initialWorkSessions = session.WorkSession.all().toModelArray();

      const action = {
        type: 'APP/UPDATE_STORE_0_1',
        payload: {
          prevStoreVersion: 0,
          nextStoreVersion: 1,
        },
      };
      const nextState = entitiesReducer(session.state, action);
      const nextSession = orm.session(nextState);
      workSessions = nextSession.WorkSession.all().toModelArray();
    });

    it('Does not delete any session', () => {
      expect(workSessions.length).toEqual(initialWorkSessions.length);
    });
    it('Adds the \'device\' attribute', () => {
      initialWorkSessions.forEach(
        workSession => expect(workSession.device).toBeUndefined(),
      );
      workSessions.forEach(
        workSession => expect(workSession.device).toEqual('mobile'),
      );
    });
  });

  describe('Store update from version 1 to 2', () => {
    let initialSubjects;
    let subjects;

    beforeAll(async () => {
      await factory.createMany('Subject', 4);
      initialSubjects = session.Subject.all().toModelArray();

      const action = {
        type: 'APP/UPDATE_STORE_1_2',
        payload: {
          prevStoreVersion: 1,
          nextStoreVersion: 2,
        },
      };
      const nextState = entitiesReducer(session.state, action);
      const nextSession = orm.session(nextState);
      subjects = nextSession.Subject.all().toModelArray();
    });

    it('Does not delete any subject', () => {
      expect(subjects.length).toEqual(initialSubjects.length);
    });
    it('Adds the \'archived\' attribute', () => {
      initialSubjects.forEach(
        subject => expect(subject.archived).toBeUndefined(),
      );
      subjects.forEach(
        subject => expect(subject.archived).toEqual(false),
      );
    });
  });
});
