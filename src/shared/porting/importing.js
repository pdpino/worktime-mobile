import { makeFunctionAsync, removeStrAccents, ElementsIndex } from '../utils';

function simplifyName(name) {
  return removeStrAccents((name || '')
    .toLowerCase()
    .trim()
    .replace(/[_-\s]/g, '-'));
}

function createSubjectsIndex(subjects) {
  const getByName = subject => simplifyName(subject.name);
  return new ElementsIndex(subjects, getByName);
}

function createWorkSessionsIndex(workSessions) {
  const getByTimestamp = workSession => Math.floor(workSession.timestampStart);
  return new ElementsIndex(workSessions, getByTimestamp);
}

export function getPreviewSubjects(preSubjects, incomingSubjects) {
  const subjectsIndex = createSubjectsIndex(preSubjects);

  return incomingSubjects.map(subject => ({
    name: subject.name,
    exists: subjectsIndex.exists(subject),
  }));
}

export const getImportableSubjects = makeFunctionAsync((
  preSubjects, incomingSubjects, selectedSubjects, device,
) => {
  const subjectsIndex = createSubjectsIndex(preSubjects);

  return incomingSubjects
    .filter(incomingSubject => selectedSubjects[incomingSubject.name])
    .map((incomingSubject) => {
      const existingSubject = subjectsIndex.getWithSameId(incomingSubject);

      const existingWorkSessions = existingSubject
        ? existingSubject.getWorkSessions()
        : [];
      const workSessionsIndex = createWorkSessionsIndex(existingWorkSessions);

      const incomingWorkSessions = incomingSubject.workSessions
        .filter(workSession => !workSessionsIndex.exists(workSession)
          && workSession.device === device);

      return {
        ...incomingSubject,
        id: existingSubject ? existingSubject.id : null,
        workSessions: incomingWorkSessions,
      };
    });
});
