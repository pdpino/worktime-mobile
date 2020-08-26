import PushNotification from 'react-native-push-notification';
import i18n from '../../shared/i18n';
import ActionsHandler from './actions';

let actionsHandler;

class Notifications {
  static updateTranslations() {
    if (actionsHandler) {
      actionsHandler.updateTranslations();
    }
  }

  static configure({ actions }) {
    actionsHandler = new ActionsHandler(actions);

    PushNotification.configure({
      onRegister() { },
      onNotification() { },
      onAction(notification) {
        const { action } = notification;
        if (!action) return;

        const callback = actionsHandler.labelToCallback(action);
        if (callback) {
          callback();
        }
      },
      popInitialNotification: false,
      requestPermissions: false,
    });
  }

  static parseActions(actions) {
    return actions.map(
      (actionName) => actionsHandler.nameToLabel(actionName),
    );
  }

  static sendLocal(options) {
    const { title, icon, actions } = options;
    PushNotification.localNotification({
      id: '0',
      title,
      message: i18n.t('notif.tapToGoToWorktime'),
      largeIcon: icon,
      smallIcon: icon,
      color: 'red',
      autoCancel: false,
      vibrate: false,
      ongoing: false,
      channelId: 'player-state',
      playSound: false,
      invokeApp: false,
      actions: Notifications.parseActions(actions),
    });
  }

  static start(subject) {
    Notifications.resume(subject);
  }

  static resume(subject) {
    Notifications.sendLocal({
      title: i18n.t('workPlayer.workingOnSubject', { subject: subject.name }),
      icon: 'play',
      actions: ['pause', 'stop'],
    });
  }

  static pause(subject) {
    Notifications.sendLocal({
      title: i18n.t('workPlayer.subjectPaused', { subject: subject.name }),
      icon: 'pause',
      actions: ['resume', 'stop'],
    });
  }

  static stop() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default Notifications;
