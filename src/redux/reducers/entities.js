import { getTimezoneOffset } from '../../shared/dates';

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

function addTimezoneOffset(WorkSession) {
  const tzOffset = getTimezoneOffset();
  WorkSession.all().update({ tzOffset });
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
    case 'UPDATE_SUBJECTS': {
      const { idsSet, attributes } = action.payload;
      Subject
        .all()
        .filter(subject => idsSet.has(subject.id))
        .update(attributes);
      break;
    }
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
      const {
        timestamp, tzOffset, subject, deviceName,
      } = action.payload;
      WorkSession.start(timestamp, tzOffset, subject.id, deviceName);
      break;
    }
    case 'PLAYER/STARTED':
    case 'PLAYER/UPDATE_TIMES': {
      const { runningSessionId, timestamp } = action.payload;
      if (WorkSession.idExists(runningSessionId)) {
        WorkSession.withId(runningSessionId).updateTimes(timestamp);
      }
      break;
    }
    case 'PLAYER/RESUME': {
      const { runningSessionId, timestamp } = action.payload;
      if (WorkSession.idExists(runningSessionId)) {
        WorkSession.withId(runningSessionId).resume(timestamp);
      }
      break;
    }
    case 'PLAYER/PAUSE': {
      const { runningSessionId, timestamp } = action.payload;
      if (WorkSession.idExists(runningSessionId)) {
        WorkSession.withId(runningSessionId).pause(timestamp);
      }
      break;
    }
    case 'PLAYER/STOP': {
      const { runningSessionId, timestamp } = action.payload;
      if (WorkSession.idExists(runningSessionId)) {
        WorkSession.withId(runningSessionId).stop(timestamp);
      }
      break;
    }
    case 'PLAYER/STOP_DISCARD': {
      const { runningSessionId } = action.payload;
      if (WorkSession.idExists(runningSessionId)) {
        WorkSession.withId(runningSessionId).delete();
      }
      break;
    }
    case 'IMPORT_SUBJECTS_DATA':
      action.payload.importableSubjects
        .forEach(importableSubject => Subject.import(importableSubject));
      break;
    case 'UPDATE_DEVICE_NAME': {
      const { oldDeviceName, newDeviceName } = action.payload;
      updateWorkSessionDeviceWhere(WorkSession, oldDeviceName, newDeviceName);
      break;
    }
    case 'APP/UPDATE_STORE_0_1':
      updateWorkSessionDevice(WorkSession, 'mobile');
      break;
    case 'APP/UPDATE_STORE_1_2':
      addArchivedAttr(Subject);
      break;
    case 'APP/UPDATE_STORE_3_4':
      addTimezoneOffset(WorkSession);
      break;
    default:
  }
  return session.state;
};

export default entities;
