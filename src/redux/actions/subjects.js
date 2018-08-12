export const upsertSubject = attributes => ({
  type: 'UPSERT_SUBJECT',
  payload: {
    attributes,
  },
});

export const removeSubject = id => ({
  type: 'REMOVE_SUBJECT',
  payload: {
    id,
  },
});
