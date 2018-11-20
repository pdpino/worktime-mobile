// eslint-disable-next-line import/prefer-default-export
export const deleteWorkSession = id => ({
  type: 'DELETE_WORK_SESSION',
  payload: {
    id,
  },
});
