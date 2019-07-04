function updateWorkSessionDevice(WorkSession, device) {
  WorkSession.all().update({ device });
}

function updateWorkSessionDeviceWhere(WorkSession, oldName, newName) {
  WorkSession.all()
    .filter(workSession => workSession.device === oldName)
    .update({ device: newName });
}

function addArchivedAttr(Subject) {
  Subject.all().update({ archived: false });
}

const entities = orm => (state, action) => {
  const session = orm.session(state);
  const { Category, Subject, WorkSession } = session;

  switch (action.type) {
    case 'UPSERT_CATEGORY':
      Category.upsert(action.payload.attributes);
      break;
    case 'DELETE_CATEGORY':
      if (Category.idExists(action.payload.id)) {
        Category.withId(action.payload.id).delete();
      }
      break;
    case 'UPSERT_SUBJECT':
      Subject.upsert(action.payload.attributes);
      break;
    case 'ARCHIVE_SUBJECTS':
      action.payload.ids.forEach((id) => {
        if (Subject.idExists(id)) {
          Subject.withId(id).update({ archived: action.payload.archived });
        }
      });
      break;
    case 'DELETE_SUBJECTS':
      action.payload.ids.forEach((id) => {
        if (Subject.idExists(id)) {
          Subject.withId(id).delete();
        }
      });
      break;
    case 'DELETE_WORK_SESSION':
      if (WorkSession.idExists(action.payload.id)) {
        WorkSession.withId(action.payload.id).delete();
      }
      break;
    case 'PLAYER/STARTING': {
      const { timestamp, subject, deviceName } = action.payload;
      WorkSession.start(timestamp, subject.id, deviceName);
      break;
    }
    case 'PLAYER/STARTED':
    case 'PLAYER/UPDATE_TIMES': {
      const { runningSessionId, timestamp } = action.payload;
      WorkSession.withId(runningSessionId).updateTimes(timestamp);
      break;
    }
    case 'PLAYER/RESUME':
      WorkSession.withId(action.payload.runningSessionId).resume(action.payload.timestamp);
      break;
    case 'PLAYER/PAUSE':
      WorkSession.withId(action.payload.runningSessionId).pause(action.payload.timestamp);
      break;
    case 'PLAYER/STOP':
      WorkSession.withId(action.payload.runningSessionId).stop(action.payload.timestamp);
      break;
    case 'PLAYER/STOP_DISCARD':
      WorkSession.withId(action.payload.runningSessionId).delete();
      break;
    case 'IMPORT_SUBJECTS_DATA':
      action.payload.importableSubjects
        .forEach(importableSubject => Subject.import(importableSubject));
      break;
    case 'UPDATE_DEVICE_NAME': {
      const { oldDeviceName, newDeviceName } = action.payload;
      updateWorkSessionDeviceWhere(WorkSession, oldDeviceName, newDeviceName);
      break;
    }
    case 'APP/UPDATE_STORE': {
      const { prevStoreVersion, nextStoreVersion } = action.payload;
      for (
        let storeVersion = prevStoreVersion + 1;
        storeVersion <= nextStoreVersion;
        storeVersion += 1
      ) {
        if (storeVersion === 1) {
          updateWorkSessionDevice(WorkSession, 'mobile');
        } else if (storeVersion === 2) {
          addArchivedAttr(Subject);
        }
      }
      break;
    }
    default:
  }
  return session.state;
};

export default entities;
