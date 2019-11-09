import { getTimestamp } from '../../shared/dates';

// eslint-disable-next-line import/prefer-default-export
export const importFromJson = (device, importableSubjects) => ({
  type: 'IMPORT_SUBJECTS_DATA',
  payload: {
    importableSubjects,
    device,
    timestamp: getTimestamp(),
  },
});
