export const upsertSubject = attributes => ({
  type: 'UPSERT_SUBJECT',
  payload: {
    attributes,
  },
});

export const archiveSubjects = (ids, archived) => ({
  type: 'ARCHIVE_SUBJECTS',
  payload: {
    ids,
    archived,
  },
});

export const deleteSubjects = ids => ({
  type: 'DELETE_SUBJECTS',
  payload: {
    ids,
  },
});
