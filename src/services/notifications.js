import PushNotification from 'react-native-push-notification';

class Notifications {
  static sendNotification(title) {
    PushNotification.localNotification({
      id: '0',
      title,
      message: 'Tap to go to worktime',
      // bigText: 'My big text that will be shown when notification is expanded',
      // subText: 'This is a subText',
      color: 'red',
      autoCancel: false,
      vibrate: false,
      ongoing: false,
      playSound: false,
    });
  }

  static configure() {
    PushNotification.configure({
      onRegister() { },
      onNotification() { },
      popInitialNotification: false,
      requestPermissions: true,
    });
  }

  static start(subjectName) {
    this.sendNotification(`${subjectName} playing`); // DICTIONARY
  }

  static pause(subjectName) {
    this.sendNotification(`${subjectName} paused`); // DICTIONARY
  }

  static cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default Notifications;
