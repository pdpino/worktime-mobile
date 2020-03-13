import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { CategoryForm } from '../form';

const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

const factory = getFactory();

describe('<CategoryForm>', () => {
  describe('Edit category mode', () => {
    let category;
    beforeAll(async () => {
      category = await factory.create('Category');
    });

    it('renders with basic props', async () => {
      renderer.create(
        <CategoryForm
          navigation={navigation}
          category={category}
        />,
      );
    });
  });

  describe('New category mode', () => {
    it('renders with basic props', async () => {
      renderer.create(
        <CategoryForm
          navigation={navigation}
        />,
      );
    });
  });
});
