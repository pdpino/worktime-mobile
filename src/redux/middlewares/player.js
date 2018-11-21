import NotificationsService from '../../services/notifications';
import {
  resume, pause, stop, updateWorkTimes,
} from '../actions';

const UpdateWorkTimesService = (store, seconds) => {
  let intervalId;
  return {
    start: () => {
      intervalId = setInterval(
        () => store.dispatch(updateWorkTimes()),
        seconds * 1000,
      );
    },
    stop: () => clearInterval(intervalId),
  };
};

const playerMiddleware = (store) => {
  NotificationsService.configure();
  NotificationsService.registerActions({
    Resume: () => store.dispatch(resume()),
    Pause: () => store.dispatch(pause()),
    Stop: () => store.dispatch(stop()),
  });

  const updateTimesService = UpdateWorkTimesService(store, 60);
  // TODO: if there is a running session, start the service

  // TODO: use std name: updateWorkTimes vs updateTimes
  // (see action, service, etc)

  // REVIEW: move service to services/ folder?
  // could also be a generic interval service, receive seconds and callback

  // TODO: when starting the service, run an initial update
  // to display something in the status box of the work-player

  // TODO: what happens with the service when you minimize or close the app?

  return next => (action) => {
    if (!action.type.startsWith('PLAYER/')) {
      return next(action);
    }

    const result = next(action);
    const { subject } = action.payload;

    switch (action.type) {
      case 'PLAYER/START':
        NotificationsService.start(subject);
        break;
      case 'PLAYER/SAVE_RUNNING_SESSION_ID':
        updateTimesService.start();
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
        updateTimesService.stop();
        break;
      default:
    }

    return result;
  };
};

export default playerMiddleware;
