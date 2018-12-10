import { getTimestamp } from '../../shared/utils';

// eslint-disable-next-line import/prefer-default-export
export const updateExportTimestamp = () => ({
  type: 'UPDATE_EXPORT_TIMESTAMP',
  payload: {
    timestamp: getTimestamp(),
  },
});
