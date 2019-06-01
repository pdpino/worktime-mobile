export const upsertSubject = attributes => ({
  type: 'UPSERT_SUBJECT',
  payload: {
    attributes,
  },
});

export const deleteSubjects = ids => ({
  type: 'DELETE_SUBJECTS',
  payload: {
    ids,
  },
});
