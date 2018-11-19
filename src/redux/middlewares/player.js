import NotificationsService from '../../services/notifications';
import { resume, pause, stop } from '../actions';

const playerMiddleware = (store) => {
  NotificationsService.configure();
  NotificationsService.registerActions({
    Resume: () => store.dispatch(resume()),
    Pause: () => store.dispatch(pause()),
    Stop: () => store.dispatch(stop()),
  });

  return next => (action) => {
    if (!action.type.startsWith('PLAYER/')) {
      return next(action);
    }

    const result = next(action);
    const { subject } = action.payload;

    switch (action.type) {
      case 'PLAYER/START': {
        NotificationsService.start(subject);
        break;
      }
      case 'PLAYER/RESUME':
        NotificationsService.resume(subject);
        break;
      case 'PLAYER/PAUSE':
        NotificationsService.pause(subject);
        break;
      case 'PLAYER/STOP':
      case 'PLAYER/STOP_DISCARD':
        NotificationsService.stop();
        break;
      default:
    }

    return result;
  };
};

export default playerMiddleware;
