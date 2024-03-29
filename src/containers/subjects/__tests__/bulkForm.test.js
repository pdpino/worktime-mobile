import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { BulkSubjectForm } from '../bulkForm';

/* global helperMockBuilders */

const factory = getFactory();

describe('<BulkSubjectForm>', () => {
  let subjects;
  let categories;
  beforeAll(async () => {
    subjects = await factory.createMany('Subject', 2);
    categories = await factory.createMany('Category', 3);
  });

  it('renders with basic props', async () => {
    renderer.create(
      <BulkSubjectForm
        {...helperMockBuilders.NavigationProps()}
        subjects={subjects}
        categories={categories}
      />,
    );
  });

  it('renders with only 1 subject', async () => {
    renderer.create(
      <BulkSubjectForm
        {...helperMockBuilders.NavigationProps()}
        subjects={subjects.slice(0, 1)}
        categories={categories}
      />,
    );
  });

  it('renders with 0 categories', async () => {
    renderer.create(
      <BulkSubjectForm
        {...helperMockBuilders.NavigationProps()}
        subjects={subjects}
        categories={[]}
      />,
    );
  });

  it('renders with no categories prop', async () => {
    renderer.create(
      <BulkSubjectForm
        {...helperMockBuilders.NavigationProps()}
        subjects={subjects}
      />,
    );
  });
});
