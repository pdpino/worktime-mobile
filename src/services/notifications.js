import PushNotification from 'react-native-push-notification';

class Notifications {
  static sendNotification(title, icon) {
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
    this.sendNotification(`${subjectName} playing`, 'play'); // DICTIONARY
  }

  static pause(subjectName) {
    this.sendNotification(`${subjectName} paused`, 'pause'); // DICTIONARY
  }

  static cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default Notifications;
