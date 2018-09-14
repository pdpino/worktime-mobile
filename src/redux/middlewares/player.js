import NotificationsService from '../../services/notifications';
import { resume, pause, stop } from '../actions';

const playerMiddleware = (store) => {
  NotificationsService.configure();
  NotificationsService.registerActions({
    Resume: () => store.dispatch(resume()),
    Pause: () => store.dispatch(pause()),
    Stop: () => store.dispatch(stop()),
  });

  const notifications = new NotificationsService();

  return next => (action) => {
    if (!action.type.startsWith('PLAYER/')) {
      return next(action);
    }

    switch (action.type) {
      case 'PLAYER/START': {
        notifications.start(action.payload.subject);
        break;
      }
      case 'PLAYER/RESUME':
        notifications.resume();
        break;
      case 'PLAYER/PAUSE':
        notifications.pause();
        break;
      case 'PLAYER/STOP':
        notifications.stop();
        break;
      default:
    }

    return next(action);
  };
};

export default playerMiddleware;
