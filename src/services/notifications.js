import PushNotification from 'react-native-push-notification';
import { DeviceEventEmitter } from 'react-native';
import i18n from '../shared/i18n';

let listener;

class Notifications {
  static configure() {
    PushNotification.configure({
      onRegister() { },
      onNotification() { },
      popInitialNotification: false,
      requestPermissions: true,
    });
  }

  static registerActions(actions) {
    const actionNames = Object.keys(actions);
    PushNotification.registerNotificationActions(actionNames);

    listener = DeviceEventEmitter.addListener(
      'notificationActionReceived',
      ({ dataJSON }) => {
        const { action } = JSON.parse(dataJSON);
        const callback = actions[action];
        if (callback) {
          callback();
        }
      },
    );
  }

  static unRegisterActions() {
    // FIXME: this method is not called from anywhere
    if (listener) {
      listener.remove();
    }
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
      playSound: false,
      actions: JSON.stringify(actions),
    });
  }

  static start(subject) {
    Notifications.resume(subject);
  }

  static resume(subject) {
    Notifications.sendLocal({
      title: i18n.t('workPlayer.workingOnSubject', { subject: subject.name }),
      icon: 'play',
      actions: ['Pause', 'Stop'],
    });
  }

  static pause(subject) {
    Notifications.sendLocal({
      title: i18n.t('workPlayer.subjectPaused', { subject: subject.name }),
      icon: 'pause',
      actions: ['Resume', 'Stop'],
    });
  }

  static stop() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default Notifications;
