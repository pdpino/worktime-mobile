import { FactoryHandler } from '../../__tests__';
import { categoriesSelector } from '../categories';

const factoryHandler = new FactoryHandler();

describe('categoriesSelector', () => {
  beforeEach(() => {
    factoryHandler.reset();
  });

  it('returns all the categories', async () => {
    await factoryHandler.factory.createMany('Category', 7);

    const categories = categoriesSelector({
      entities: factoryHandler.session.state,
    });
    expect(categories).toBeArrayOfSize(7);
  });

  it('returns an empty list (not null) on empty store', () => {
    const categories = categoriesSelector({
      entities: factoryHandler.session.state,
    });
    expect(categories).toBeArrayOfSize(0);
  });

  it('returns an empty list (not null) on initial state', () => {
    const categories = categoriesSelector({
      entities: factoryHandler.entitiesReducer(undefined, {}),
    });
    expect(categories).toBeArrayOfSize(0);
  });
});
