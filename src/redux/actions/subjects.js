export const upsertSubject = attributes => ({
  type: 'UPSERT_SUBJECT',
  payload: {
    attributes,
  },
});

export const deleteSubject = id => ({
  type: 'DELETE_SUBJECT',
  payload: {
    id,
  },
});
