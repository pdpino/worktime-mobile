import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { SubjectForm } from '../form';

const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

const factory = getFactory();

describe('<SubjectForm>', () => {
  let categories;
  beforeAll(async () => {
    categories = await factory.createMany('Category', 3);
  });

  describe('Edit subject mode', () => {
    let subject;
    beforeAll(async () => {
      subject = await factory.create('Subject');
    });

    it('renders with basic props', async () => {
      renderer.create(
        <SubjectForm
          navigation={navigation}
          subject={subject}
          categories={categories}
        />,
      );
    });

    it('renders with no categories', async () => {
      renderer.create(
        <SubjectForm
          navigation={navigation}
          subject={subject}
        />,
      );
    });
  });

  describe('New subject mode', () => {
    it('renders with basic props', async () => {
      renderer.create(
        <SubjectForm
          navigation={navigation}
          categories={categories}
        />,
      );
    });

    it('renders with no categories', async () => {
      renderer.create(
        <SubjectForm
          navigation={navigation}
        />,
      );
    });
  });
});
