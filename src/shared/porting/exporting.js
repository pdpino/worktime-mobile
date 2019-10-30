import { makeFunctionAsync } from '../utils';

function getExportableSubjects(subjectsSet) {
  return subjectsSet.toModelArray().map(subject => subject.exportable());
}

export const getExportableObject = makeFunctionAsync((options) => {
  const { device, timestamp, subjectsSet } = options;

  const exportObject = {
    device,
    timestamp,
  };

  if (subjectsSet) {
    exportObject.subjects = getExportableSubjects(subjectsSet);
  }

  return exportObject;
});

export function getExportFilename(device) {
  return `worktime-data-${device}.json`;
}
