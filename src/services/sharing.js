import Share from 'react-native-share';
import { PermissionsAndroid } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import i18n from '../shared/i18n';

const RNFS = require('react-native-fs');

export default function share(filename, obj) {
  const content = JSON.stringify(obj, null, 2);
  const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
  const url = `file://${path}`;

  return RNFS.writeFile(path, content, 'utf8').then(() => Share.open({
    url,
    title: i18n.t('porting.exportData'),
    subject: filename,
    type: 'text/plain',
  })).catch(() => {});
}

function requestExternalStoragePermission() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ).then((granted) => granted === PermissionsAndroid.RESULTS.GRANTED);
}

export function openFileSelector(title) {
  return requestExternalStoragePermission()
    .then((hasPermission) => hasPermission
      && new Promise((resolve) => RNFileSelector.Show({
        title,
        onDone: (path) => resolve(path),
      })));
}

export function openJsonFile(path) {
  return RNFS.readFile(path, 'utf8')
    .then((fileContent) => JSON.parse(fileContent))
    .catch(() => Promise.resolve(null));
}
