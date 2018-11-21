import NotificationsService from '../../services/notifications';
import OnIntervalService from '../../services/onInterval';
import {
  resume, pause, stop, updateWorkTimes,
} from '../actions';
import { runningSessionSelector } from '../selectors';

const playerMiddleware = (store) => {
  NotificationsService.configure();
  NotificationsService.registerActions({
    Resume: () => store.dispatch(resume()),
    Pause: () => store.dispatch(pause()),
    Stop: () => store.dispatch(stop()),
  });

  const workTimesService = OnIntervalService(
    () => store.dispatch(updateWorkTimes()),
    60,
  );

  const isWorking = () => runningSessionSelector(store.getState());

  return next => (action) => {
    switch (action.type) {
      case 'APP/ACTIVATE':
        if (isWorking()) {
          if (!workTimesService.isActive()) {
            workTimesService.start();
          }
          store.dispatch(updateWorkTimes());
        }
        break;
      case 'APP/DEACTIVATE':
        if (workTimesService.isActive()) {
          workTimesService.stop();
        }
        break;
      default:
    }

    if (!action.type.startsWith('PLAYER/')) {
      return next(action);
    }

    const result = next(action);
    const { subject } = action.payload;

    switch (action.type) {
      case 'PLAYER/STARTING':
        NotificationsService.start(subject);
        break;
      case 'PLAYER/STARTED':
        workTimesService.start();
        break;
      case 'PLAYER/RESUME':
        NotificationsService.resume(subject);
        break;
      case 'PLAYER/PAUSE':
        NotificationsService.pause(subject);
        break;
      case 'PLAYER/STOP':
      case 'PLAYER/STOP_DISCARD':
        NotificationsService.stop();
        workTimesService.stop();
        break;
      default:
    }

    return result;
  };
};

export default playerMiddleware;
