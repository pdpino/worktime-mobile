import PushNotification from 'react-native-push-notification';
import { DeviceEventEmitter } from 'react-native';

class Notifications {
  // REVIEW: maybe u could separate this in two classes,
  // one to handle generic notifications (adapter to PushNotification library)
  // and another one to emit specific worktime notifications
  // overkill?

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

    DeviceEventEmitter.addListener('notificationActionReceived', ({ dataJSON }) => {
      const { action } = JSON.parse(dataJSON);
      if (actions[action]) {
        actions[action]();
      }
    });
  }

  static sendLocal(options) {
    const { title, icon, actions } = options;
    PushNotification.localNotification({
      id: '0',
      title,
      message: 'Tap to go to worktime',
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

  start(subject) {
    this.subjectName = subject.name;
    this.resume();
  }

  resume() {
    Notifications.sendLocal({
      title: `${this.subjectName} playing`, // DICTIONARY
      icon: 'play',
      actions: ['Pause', 'Stop'],
    });
  }

  pause() {
    Notifications.sendLocal({
      title: `${this.subjectName} paused`, // DICTIONARY
      icon: 'pause',
      actions: ['Resume', 'Stop'],
    });
  }

  stop() {
    PushNotification.cancelAllLocalNotifications();
    this.subjectName = '';
  }
}

export default Notifications;