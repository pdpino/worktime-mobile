import { Alert } from 'react-native';

export function alertDelete({
  title, message, deleteMessage, onDelete,
}) {
  // DICTIONARY
  Alert.alert(
    title || 'Delete?',
    message || 'This can\'t be undone',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: deleteMessage || 'Delete',
        onPress: onDelete,
        style: 'destructive', // NOTE: style works only for iOS
      },
    ],
  );
}

export function alertError({ title, message }) {
  // DICTIONARY
  Alert.alert(
    title || 'Error',
    message,
    [
      { text: 'Ok' },
    ],
  );
}
