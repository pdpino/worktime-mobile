import { makeFunctionAsync, removeStrAccents, ElementsIndex } from '../utils';

function simplifyName(name) {
  return removeStrAccents((name || '')
    .toLowerCase()
    .trim()
    .replace(/[_-\s]/g, '-'));
}

function createSubjectsIndex(subjects) {
  const getByName = (subject) => simplifyName(subject.name);
  return new ElementsIndex(subjects, getByName);
}

function createWorkSessionsIndex(workSessions) {
  const getByTimestamp = (workSession) => Math.floor(workSession.timestampStart);
  return new ElementsIndex(workSessions, getByTimestamp);
}

function getTimestampRange(timestamps) {
  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);

  return {
    minTimestamp,
    maxTimestamp,
  };
}

export const processSubjects = makeFunctionAsync((
  preSubjects, incomingSubjects, selectedSubjects,
) => {
  const subjectsIndex = createSubjectsIndex(preSubjects);

  let totalIgnored = 0;
  let totalAccepted = 0;
  const processedSubjects = incomingSubjects
    .map((incomingSubject) => {
      const existingSubject = subjectsIndex.getWithSameId(incomingSubject);

      const existingWorkSessions = existingSubject
        ? existingSubject.getWorkSessions()
        : [];
      const workSessionsIndex = createWorkSessionsIndex(existingWorkSessions);

      let ignoredRepeated = 0;
      const filteredWorkSessions = (incomingSubject.workSessions || [])
        .filter((workSession) => {
          const workSessionExists = workSessionsIndex.exists(workSession);

          // NOTE: the ignored could be calculated from incoming-length
          // and outgoing-length (subtraction), but it is done like this
          // to leave the possibility of different reasons to ignore a
          // work-session (e.g. import only from a certain device,
          // from a certain date forward, etc)
          ignoredRepeated += workSessionExists;

          return !workSessionExists;
        });

      const { minTimestamp, maxTimestamp } = getTimestampRange(
        filteredWorkSessions.map((workSession) => workSession.timestampStart),
      );

      const metadata = {
        exists: !!existingSubject,
        ignored: ignoredRepeated,
        accepted: filteredWorkSessions.length,
        minTimestamp,
        maxTimestamp,
      };

      // HACK: hacky solution, this function is poorly designed!
      // The selection only affects the global metadata, but not the actual
      // processedSubjects array (very confusing!).
      if (!selectedSubjects || selectedSubjects[incomingSubject.name]) {
        totalIgnored += metadata.ignored;
        totalAccepted += metadata.accepted;
      } else {
        totalIgnored += metadata.ignored + metadata.accepted;
      }

      const data = {
        ...incomingSubject,
        id: existingSubject ? existingSubject.id : null,
        workSessions: filteredWorkSessions,
      };

      return {
        data,
        metadata,
      };
    });

  const { minTimestamp, maxTimestamp } = getTimestampRange(
    processedSubjects.flatMap(
      (subject) => (
        !selectedSubjects || selectedSubjects[subject.data.name]
          ? subject.data.workSessions.map((ws) => ws.timestampStart)
          : []
      ),
    ),
  );

  const allMetadata = {
    minTimestamp,
    maxTimestamp,
    ignored: totalIgnored,
    accepted: totalAccepted,
  };

  return {
    metadata: allMetadata,
    processedSubjects: processedSubjects.sort((subj1, subj2) => {
      // -1 if subj1 first
      // 0 if equal
      // 1 if subj2 first

      const { metadata: meta1 } = subj1;
      const { metadata: meta2 } = subj2;

      // Always new subjects first
      if (!meta1.exists && meta2.exists) return -1;
      if (meta1.exists && !meta2.exists) return 1;

      // Subjects with more work-sessions first
      if (meta1.accepted > meta2.accepted) return -1;
      if (meta1.accepted < meta2.accepted) return 1;

      // Subjects with most recent work-sessions
      if (meta1.maxTimestamp > meta2.maxTimestamp) return -1;
      if (meta1.maxTimestamp < meta2.maxTimestamp) return 1;

      // Lastly, by name
      const name1 = simplifyName(subj1.data.name);
      const name2 = simplifyName(subj2.data.name);
      return name1 <= name2 ? -1 : 1;
    }),
  };
});

export function getImportableSubjects(processedSubjects, subjectSelection) {
  const importableSubjects = processedSubjects.map(({ data }) => data);
  return subjectSelection
    ? importableSubjects
      .filter((subject) => subjectSelection[subject.name])
    : importableSubjects;
}
