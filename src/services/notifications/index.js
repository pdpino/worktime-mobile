import notifee, { AndroidVisibility, EventType } from '@notifee/react-native';
import i18n from '../../shared/i18n';
import { colors } from '../../shared/styles';

class Notifications {
  constructor() {
    this.foregroundUnsubscriber = null;
    this.backgroundUnsubscriber = null;

    this.callbacks = {};
  }

  invokeCallback = ({ type, detail }) => {
    if (type !== EventType.ACTION_PRESS) {
      return;
    }
    const callback = this.callbacks[detail.pressAction.id];
    if (callback) {
      callback();
    }
  }

  listenForegroundEvents = () => {
    this.foregroundUnsubscriber = notifee.onForegroundEvent(this.invokeCallback);
  }

  removeListeners = () => {
    if (this.foregroundUnsubscriber) {
      this.foregroundUnsubscriber();
    }
  }

  listenBackgroundEvents = () => {
    // NOTE: only one listener can be subscribed with notifee.onBackgroundEvent()
    this.backgroundUnsubscriber = notifee.onBackgroundEvent(
      (...params) => Promise.resolve(this.invokeCallback(...params)),
    );
  }

  registerActions = (actions) => {
    this.callbacks = {
      ...this.callbacks,
      ...actions,
    };
  }

  sendLocal = async (options) => {
    const channelId = await notifee.createChannel({
      id: 'player-status',
      name: 'Player status',
      visibility: AndroidVisibility.PUBLIC,
      vibration: false,
    });

    const { title, icon, actions } = options;
    await notifee.displayNotification({
      id: '1',
      title,
      body: i18n.t('notif.tapToGoToWorktime'),
      android: {
        channelId,
        smallIcon: icon,
        largeIcon: icon,
        color: colors.mainBlue,
        autoCancel: false,
        showTimestamp: true,
        pressAction: {
          id: 'press',
          launchActivity: 'default',
        },
        actions,
      },
    });
  }

  start = (subject) => this.resume(subject)

  resume = (subject) => this.sendLocal({
    title: i18n.t('workPlayer.workingOnSubject', { subject: subject.name }),
    icon: 'play',
    actions: [
      {
        title: i18n.t('notif.actions.pause'),
        icon: 'pause',
        pressAction: { id: 'pause' },
      },
      {
        title: i18n.t('notif.actions.stop'),
        icon: 'stop',
        pressAction: { id: 'stop' },
      },
    ],
  })

  pause = (subject) => this.sendLocal({
    title: i18n.t('workPlayer.subjectPaused', { subject: subject.name }),
    icon: 'pause',
    actions: [
      {
        title: i18n.t('notif.actions.resume'),
        icon: 'resume',
        pressAction: { id: 'resume' },
      },
      {
        title: i18n.t('notif.actions.stop'),
        icon: 'stop',
        pressAction: { id: 'stop' },
      },
    ],
  })

  stop = (subject) => this.sendLocal({
    title: i18n.t('workPlayer.subjectStopped', { subject: subject.name }),
    icon: 'stop',
    actions: [],
  });
}

const notificationSingleton = new Notifications();

export default notificationSingleton;
