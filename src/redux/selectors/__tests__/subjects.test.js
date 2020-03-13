import { FactoryHandler } from '../../__tests__';
// import entities from '../../reducers/entities';
// import orm from '../../models/orm';
import { subjectsSelector } from '../subjects';

const factoryHandler = new FactoryHandler();

// const entitiesReducer = entities(orm);

describe('subjectsSelector', () => {
  beforeEach(() => {
    factoryHandler.reset();
  });

  it('returns all the subjects', async () => {
    await factoryHandler.factory.createMany('Subject', 5);

    const subjects = subjectsSelector({
      entities: factoryHandler.session.state,
    });
    expect(subjects).toBeArrayOfSize(5);
  });

  it('returns an empty list (not null) on empty store', () => {
    const subjects = subjectsSelector({
      entities: factoryHandler.session.state,
    });
    expect(subjects).toBeArrayOfSize(0);
  });

  it('returns an empty list (not null) on initial state', () => {
    const subjects = subjectsSelector({
      entities: factoryHandler.entitiesReducer(undefined, {}),
    });
    expect(subjects).toBeArrayOfSize(0);
  });
});
