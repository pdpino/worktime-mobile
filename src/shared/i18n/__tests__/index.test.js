import i18n from '../index';
import { mockBestLocale } from './mockRNLocale';

describe('i18n', () => {
  const checkWithLowerCase = (key, expected) => {
    const translated = i18n.t(key);

    expect(translated.toLowerCase).toBeFunction();
    expect(translated.toLowerCase()).toEqual(expected);
  };

  describe('translate function', () => {
    it('returns basic english strings', () => {
      checkWithLowerCase('all', 'all');
      checkWithLowerCase('archive', 'archive');
      checkWithLowerCase('cancel', 'cancel');
      checkWithLowerCase('formFields.name', 'name');
      checkWithLowerCase('formFields.alias', 'alias');
      checkWithLowerCase('entities.categories', 'categories');
      checkWithLowerCase('entities.subject', 'subject');
    });

    it('returns default english strings', () => {
      checkWithLowerCase('all', 'all');
      checkWithLowerCase('archive', 'archive');
      checkWithLowerCase('cancel', 'cancel');
      checkWithLowerCase('formFields.name', 'name');
      checkWithLowerCase('formFields.alias', 'alias');
      checkWithLowerCase('entities.categories', 'categories');
      checkWithLowerCase('entities.subject', 'subject');
    });
  });

  describe('setup function', () => {
    it('changes translations to spanish', () => {
      mockBestLocale('es-US');

      i18n.setup();

      checkWithLowerCase('all', 'todos');
    });

    it('changes translations to english', () => {
      mockBestLocale('en-US');

      i18n.setup();

      checkWithLowerCase('all', 'all');
    });
  });
});
