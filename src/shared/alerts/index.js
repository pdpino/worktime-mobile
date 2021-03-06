import { Alert, ToastAndroid } from 'react-native';
import i18n from '../i18n';

export function alertDelete({
  title, message, deleteMessage, toastMessage, onDelete,
}) {
  Alert.alert(
    title || i18n.t('deletion.deleteQuestion'),
    message || i18n.t('deletion.cantBeUndone'),
    [
      { text: i18n.t('cancel'), style: 'cancel' },
      {
        text: deleteMessage || i18n.t('deletion.delete'),
        onPress: () => {
          onDelete();
          ToastAndroid.showWithGravityAndOffset(
            toastMessage || i18n.t('deletion.deleted'),
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
          );
        },
        style: 'destructive', // NOTE: style works only for iOS
      },
    ],
  );
}

export function alertError({ title, message }) {
  Alert.alert(
    title || i18n.t('error'),
    message,
    [
      { text: i18n.t('ok') },
    ],
  );
}
