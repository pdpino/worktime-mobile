export const createSubject = subject => ({
  type: 'CREATE_SUBJECT',
  payload: {
    subject,
  },
});

export const updateSubject = (id, attributes) => ({
  type: 'UPDATE_SUBJECT',
  payload: {
    id,
    attributes,
  },
});

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
