function exportSubjects(subjectsSet, device) {
  return subjectsSet.toModelArray().map(subject => subject.exportable(device));
}

export function getExportableObject(options) {
  const exportObject = {
    device: options.device,
    timestamp: options.timestamp,
  };

  if (options.subjectsSet) {
    exportObject.subjects = exportSubjects(options.subjectsSet, options.device);
  }

  return exportObject;
}

export function getExportFilename(device) {
  return `worktime-data-${device}.json`;
}
