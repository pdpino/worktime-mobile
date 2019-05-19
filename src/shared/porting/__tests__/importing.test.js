import { getPreviewSubjects, getImportableSubjects } from '../importing';

const generateMockSubjects = () => [
  {
    id: 1,
    name: 'old subject',
    description: '',
    getWorkSessions: () => [
      {
        id: 1,
        device: 'mobile',
        timestampStart: 1.123,
      },
      {
        id: 2,
        device: 'mobile',
        timestampStart: 2.123,
      },
      {
        id: 3,
        device: 'mobile',
        timestampStart: 3.123,
      },
    ],
  },
  {
    id: 2,
    name: 'subject number two',
    description: 'random description',
    getWorkSessions: () => [
      {
        id: 4,
        device: 'mobile',
        timestampStart: 4.123,
      },
      {
        id: 5,
        device: 'mobile',
        timestampStart: 5.123,
      },
    ],
  },
  {
    id: 3,
    name: 'last subject',
    description: '',
    getWorkSessions: () => [],
  },
];

let mockSubjects;

beforeEach(() => {
  mockSubjects = generateMockSubjects();
});

describe('getPreviewSubjects', () => {
  describe('Content returned', () => {
    const incomingSubjects = [
      {
        name: 'old subject',
        description: '',
      },
      {
        name: 'new subject',
        description: '',
      },
    ];

    const expectedPreviews = [
      {
        name: 'old subject',
        exists: true,
      },
      {
        name: 'new subject',
        exists: false,
      },
    ];

    it('Contains the correct previews', () => {
      const subjectPreviews = getPreviewSubjects(
        mockSubjects,
        incomingSubjects,
      );
      expect(subjectPreviews).toEqual(expectedPreviews);
    });
  });

  describe('Name handling', () => {
    it('Matches names with upper case and trailing spaces', () => {
      mockSubjects[0].name = 'Old Subject ';

      const expectedPreviews = [{ name: ' OLD SUbject', exists: true }];
      const subjectPreviews = getPreviewSubjects(
        mockSubjects,
        [{ name: ' OLD SUbject', description: '' }],
      );
      expect(subjectPreviews).toEqual(expectedPreviews);
    });

    it('Matches names with hypens and underscore', () => {
      mockSubjects[1].name = 'subject number-two';

      const expectedPreviews = [{ name: 'subject_number-two', exists: true }];
      const subjectPreviews = getPreviewSubjects(
        mockSubjects,
        [{ name: 'subject_number-two', description: '' }],
      );
      expect(subjectPreviews).toEqual(expectedPreviews);
    });

    it('Matches names with accent marks', () => {
      mockSubjects[0].name = 'áéíóú aeiou';
      const name = 'aeiou áéíóú';

      const expectedPreviews = [{ name, exists: true }];
      const subjectPreviews = getPreviewSubjects(
        mockSubjects,
        [{ name, description: '' }],
      );
      expect(subjectPreviews).toEqual(expectedPreviews);
    });

    it('Does not match other case', () => {
      const expectedPreviews = [{ name: 'last--subject', exists: false }];
      const subjectPreviews = getPreviewSubjects(
        mockSubjects,
        [{ name: 'last--subject', description: '' }],
      );
      expect(subjectPreviews).toEqual(expectedPreviews);
    });
  });
});

describe('getImportableSubjects', () => {
  describe('Repeated work sessions', () => {
    const incomingSubjects = [
      {
        name: 'old subject',
        description: '',
        workSessions: [
          { timestampStart: 1, device: 'laptop' },
          { timestampStart: 7, device: 'laptop' },
          { timestampStart: 3, device: 'laptop' },
          { timestampStart: 2.123, device: 'laptop' },
          { timestampStart: 5.321, device: 'laptop' },
          { timestampStart: 1000.123, device: 'laptop' },
        ],
      },
    ];

    const expectedPreviews = [
      {
        id: 1,
        name: 'old subject',
        description: '',
        workSessions: [
          { timestampStart: 7, device: 'laptop' },
          { timestampStart: 5.321, device: 'laptop' },
          { timestampStart: 1000.123, device: 'laptop' },
        ],
      },
    ];

    it('Imports only non-existing work sessions', async () => {
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        incomingSubjects,
        { 'old subject': true },
        'laptop',
      );
      expect(importableSubjects).toEqual(expectedPreviews);
    });
  });

  describe('Device handling', () => {
    const incomingSubjects = [
      {
        name: 'new subject',
        description: '',
        workSessions: [
          { timestampStart: 1, device: 'laptop' },
          { timestampStart: 2, device: 'desktop' },
          { timestampStart: 3, device: 'tablet' },
          { timestampStart: 4, device: 'laptop' },
          { timestampStart: 5, device: 'mobile' },
          { timestampStart: 6, device: 'laptop' },
        ],
      },
    ];

    const expectedPreviews = [
      {
        id: null,
        name: 'new subject',
        description: '',
        workSessions: [
          { timestampStart: 1, device: 'laptop' },
          { timestampStart: 4, device: 'laptop' },
          { timestampStart: 6, device: 'laptop' },
        ],
      },
    ];

    it('Imports only work sessions from the selected device', async () => {
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        incomingSubjects,
        { 'new subject': true },
        'laptop',
      );
      expect(importableSubjects).toEqual(expectedPreviews);
    });
  });

  describe('Ids on new/old subject', () => {
    it('Sets id on an old subject', async () => {
      const expectedPreviews = [
        {
          id: 1,
          name: 'old subject',
          description: '',
          workSessions: [],
        },
      ];
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        [{ name: 'old subject', description: '', workSessions: [] }],
        { 'old subject': true },
        'laptop',
      );
      expect(importableSubjects).toEqual(expectedPreviews);
    });

    it('Does not set id on a new subject', async () => {
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        [{ name: 'new subject', description: '', workSessions: [] }],
        { 'new subject': true },
        'laptop',
      );
      expect(typeof importableSubjects[0].id).not.toBe('number');
      expect(importableSubjects[0].id).toBeFalsy();
    });
  });

  describe('Subject selection', () => {
    it('Selects the correct subjects', async () => {
      const incomingSubjects = [
        { name: 'subj 1', description: '', workSessions: [] },
        { name: 'subj 2', description: '', workSessions: [] },
        { name: 'subj 3', description: '', workSessions: [] },
      ];
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        incomingSubjects,
        { 'subj 1': true, 'subj 2': false, 'subj 3': true },
        'laptop',
      );
      const isNameInList = name => importableSubjects
        .find(subject => subject.name === name);

      expect(isNameInList('subj 1')).toBeTruthy();
      expect(isNameInList('subj 2')).toBeFalsy();
      expect(isNameInList('subj 3')).toBeTruthy();
    });
  });

  describe('Name handling', () => {
    const importAndFindByName = async (name) => {
      const importableSubjects = await getImportableSubjects(
        mockSubjects,
        [{ name, description: '', workSessions: [] }],
        { [name]: true },
        'laptop',
      );

      return importableSubjects.find(subj => subj.name === name);
    };

    it('Matches names with upper case and trailing spaces', async () => {
      mockSubjects[0].id = 17;
      mockSubjects[0].name = 'Old Subject ';
      const name = ' OLD SUbject';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.id).toBe(17);
    });

    it('Matches names with hypens and underscore', async () => {
      mockSubjects[1].id = 32;
      mockSubjects[1].name = 'subject-number two';
      const name = 'subject_number-two';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.id).toBe(32);
    });

    it('Matches names with accent marks', async () => {
      mockSubjects[0].id = 11;
      mockSubjects[0].name = 'áéíóú aeiou';
      const name = 'aeiou áéíóú';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.id).toBe(11);
    });

    it('Does not match other case', async () => {
      const name = 'last--subject';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.id).toBeFalsy();
    });
  });
});
