// eslint-disable-next-line import/prefer-default-export
export function exportSubjects(subjectsSet) {
  return subjectsSet.toModelArray().map(subject => subject.exportable());
}
