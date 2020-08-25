export const upsertCategory = (attributes) => ({
  type: 'UPSERT_CATEGORY',
  payload: {
    attributes,
  },
});

export const deleteCategory = (id) => ({
  type: 'DELETE_CATEGORY',
  payload: {
    id,
  },
});
