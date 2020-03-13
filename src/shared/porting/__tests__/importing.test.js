import { processSubjects, getImportableSubjects } from '../importing';

// TODO: use factory?
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

// NOTE: this is needed since the jest setup calls jest.useFakeTimers(),
// which breaks the (hacky) use of setTimeout as async caller in makeFunctionAsync
beforeAll(() => jest.useRealTimers());
afterAll(() => jest.useFakeTimers());

beforeEach(() => {
  mockSubjects = generateMockSubjects();
});

describe('getImportableSubjects', () => {
  let processedSubjects;

  beforeEach(() => {
    processedSubjects = [
      { data: { name: 'subj 1', description: '', workSessions: [] } },
      { data: { name: 'subj 2', description: '', workSessions: [] } },
      { data: { name: 'subj 3', description: '', workSessions: [] } },
      { data: { name: 'subj 4', description: '', workSessions: [] } },
    ];
  });

  describe('Subject selection', () => {
    it('Selects the correct subjects', async () => {
      const importableSubjects = getImportableSubjects(
        processedSubjects,
        { 'subj 1': true, 'subj 2': false, 'subj 3': true },
      );
      const isNameInList = name => importableSubjects
        .find(subject => subject.name === name);

      expect(isNameInList('subj 1')).toBeTruthy();
      expect(isNameInList('subj 2')).toBeFalsy();
      expect(isNameInList('subj 3')).toBeTruthy();
      expect(isNameInList('subj 4')).toBeFalsy();
    });

    it('Allows selecting all', async () => {
      const importableSubjects = getImportableSubjects(
        processedSubjects,
        null,
      );
      const isNameInList = name => importableSubjects
        .find(subject => subject.name === name);

      expect(isNameInList('subj 1')).toBeTruthy();
      expect(isNameInList('subj 2')).toBeTruthy();
      expect(isNameInList('subj 3')).toBeTruthy();
      expect(isNameInList('subj 4')).toBeTruthy();
    });
  });
});

describe('processSubjects', () => {
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
      const { processedSubjects } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        { 'old subject': true },
        'laptop',
      );
      expect(processedSubjects.map(s => s.data)).toEqual(expectedPreviews);
    });
  });

  describe('Device handling', () => {
    const workSessions = [
      { timestampStart: 1, device: 'laptop' },
      { timestampStart: 2, device: 'desktop' },
      { timestampStart: 3, device: 'tablet' },
      { timestampStart: 4, device: 'laptop' },
      { timestampStart: 5, device: 'mobile' },
      { timestampStart: 6, device: 'laptop' },
    ];

    const incomingSubjects = [
      {
        name: 'new subject',
        description: '',
        workSessions: [
          ...workSessions,
        ],
      },
    ];

    const expectedPreviews = [
      {
        id: null,
        name: 'new subject',
        description: '',
        workSessions: [
          ...workSessions,
        ],
      },
    ];

    it('Imports work sessions from all devices', async () => {
      const { processedSubjects } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        { 'new subject': true },
        'laptop',
      );
      expect(processedSubjects.map(s => s.data)).toEqual(expectedPreviews);
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
      const { processedSubjects } = await processSubjects(
        mockSubjects,
        [{ name: 'old subject', description: '', workSessions: [] }],
        { 'old subject': true },
        'laptop',
      );
      expect(processedSubjects.map(s => s.data)).toEqual(expectedPreviews);
    });

    it('Does not set id on a new subject', async () => {
      const { processedSubjects } = await processSubjects(
        mockSubjects,
        [{ name: 'new subject', description: '', workSessions: [] }],
        { 'new subject': true },
        'laptop',
      );
      const firstSubject = processedSubjects[0].data;
      expect(typeof firstSubject.id).not.toBe('number');
      expect(firstSubject.id).toBeFalsy();
    });
  });

  describe('Name handling', () => {
    const importAndFindByName = async (name) => {
      const { processedSubjects } = await processSubjects(
        mockSubjects,
        [{ name, description: '', workSessions: [] }],
        { [name]: true },
        'laptop',
      );

      return processedSubjects.find(subj => subj.data.name === name);
    };

    it('Matches names with upper case and trailing spaces', async () => {
      mockSubjects[0].id = 17;
      mockSubjects[0].name = 'Old Subject ';
      const name = ' OLD SUbject';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.data.id).toBe(17);
      expect(subject.metadata.exists).toBeTruthy();
    });

    it('Matches names with hypens and underscore', async () => {
      mockSubjects[1].id = 32;
      mockSubjects[1].name = 'subject-number two';
      const name = 'subject_number-two';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.data.id).toBe(32);
      expect(subject.metadata.exists).toBeTruthy();
    });

    it('Matches names with accent marks', async () => {
      mockSubjects[0].id = 11;
      mockSubjects[0].name = 'áéíóú aeiou';
      const name = 'aeiou áéíóú';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.data.id).toBe(11);
      expect(subject.metadata.exists).toBeTruthy();
    });

    it('Does not match other case', async () => {
      const name = 'last--subject';

      const subject = await importAndFindByName(name);

      expect(subject).toBeTruthy();
      expect(subject.data.id).toBeFalsy();
      expect(subject.metadata.exists).toBeFalsy();
    });
  });

  describe('Global metadata', () => {
    it('Accepts from any', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            { timestampStart: 20001, device: 'laptop' },
            { timestampStart: 20002, device: 'laptop' },
            { timestampStart: 20003, device: 'laptop' },
          ],
        },
      ];

      const { metadata } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        null,
        'laptop',
      );
      expect(metadata).toEqual({
        minTimestamp: 20001,
        maxTimestamp: 20003,
        ignored: 0,
        accepted: 3,
      });
    });

    it('Ignores outside dates', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            // Must ignore (repeated):
            { timestampStart: 1, device: 'laptop' },
            { timestampStart: 2.123, device: 'laptop' },
            { timestampStart: 3, device: 'laptop' },
            // Must accept:
            { timestampStart: 5.321, device: 'laptop' },
            { timestampStart: 7, device: 'laptop' },
            { timestampStart: 1000.123, device: 'laptop' },
          ],
        },
      ];

      const { metadata } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        { 'old subject': true },
        'laptop',
      );
      expect(metadata).toEqual({
        minTimestamp: 5.321,
        maxTimestamp: 1000.123,
        ignored: 3,
        accepted: 3,
      });
    });

    it('Includes other devices', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            // Must accept:
            { timestampStart: 1234, device: 'other' },
            { timestampStart: 12345, device: 'laptop' },
            { timestampStart: 123456, device: 'laptop' },
          ],
        },
      ];

      const { metadata } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        { 'old subject': true },
        'laptop',
      );
      expect(metadata).toEqual({
        minTimestamp: 1234,
        maxTimestamp: 123456,
        ignored: 0,
        accepted: 3,
      });
    });

    it('Ignores unselected subjects', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            { timestampStart: 20001, device: 'laptop' },
            { timestampStart: 20002, device: 'laptop' },
            { timestampStart: 20003, device: 'laptop' },
          ],
        },
        {
          name: 'some subject',
          description: '',
          workSessions: [
            { timestampStart: 1, device: 'laptop' },
            { timestampStart: 20002, device: 'laptop' },
            { timestampStart: 30005, device: 'laptop' },
          ],
        },
      ];

      const { metadata } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        { 'old subject': true },
        'laptop',
      );
      expect(metadata).toEqual({
        minTimestamp: 20001,
        maxTimestamp: 20003,
        ignored: 3,
        accepted: 3,
      });
    });
  });

  describe('Specific metadata', () => {
    it('Sets exists correctly', async () => {
      const incomingSubjects = [
        { name: 'old subject', description: '' },
        { name: 'new subject', description: '' },
      ];

      const { processedSubjects } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        null,
        'laptop',
      );
      const metadatas = processedSubjects.map(s => s.metadata);
      expect(metadatas[0].exists).toBeTruthy();
      expect(metadatas[1].exists).toBeFalsy();
    });

    it('Counts ignored and accepted', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            // Must ignore:
            { timestampStart: 1.123, device: 'laptop' },
            // Must accept:
            { timestampStart: 20001, device: 'other' },
            { timestampStart: 20002, device: 'laptop' },
          ],
        },
        {
          name: 'new subject',
          description: '',
          workSessions: [
            // Must accept:
            { timestampStart: 20001, device: 'other' },
            { timestampStart: 20002, device: 'other' },
            { timestampStart: 20003, device: 'laptop' },
            { timestampStart: 20004, device: 'laptop' },
            { timestampStart: 20005, device: 'laptop' },
          ],
        },
      ];

      const { processedSubjects } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        null,
        'laptop',
      );
      const metadatas = processedSubjects.map(s => s.metadata);
      expect(metadatas[0].ignored).toEqual(1);
      expect(metadatas[0].accepted).toEqual(2);

      expect(metadatas[1].ignored).toEqual(0);
      expect(metadatas[1].accepted).toEqual(5);
    });

    it('Extracts max and min timestamp', async () => {
      const incomingSubjects = [
        {
          name: 'old subject',
          description: '',
          workSessions: [
            // Must ignore:
            { timestampStart: 1.123, device: 'laptop' },
            { timestampStart: 3.123, device: 'laptop' },
            // Must accept:
            { timestampStart: 20001, device: 'laptop' },
            { timestampStart: 20002, device: 'laptop' },
          ],
        },
        {
          name: 'new subject',
          description: '',
          workSessions: [
            { timestampStart: 20001, device: 'laptop' },
            { timestampStart: 20002, device: 'laptop' },
            { timestampStart: 20003, device: 'laptop' },
          ],
        },
      ];

      const { processedSubjects } = await processSubjects(
        mockSubjects,
        incomingSubjects,
        null,
        'laptop',
      );
      const metadatas = processedSubjects.map(s => s.metadata);
      expect(metadatas[0].minTimestamp).toEqual(20001);
      expect(metadatas[0].maxTimestamp).toEqual(20002);

      expect(metadatas[1].minTimestamp).toEqual(20001);
      expect(metadatas[1].maxTimestamp).toEqual(20003);
    });
  });
});
