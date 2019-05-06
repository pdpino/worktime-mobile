import Share from 'react-native-share';

const RNFS = require('react-native-fs');

export default function share(filename, obj) {
  const content = JSON.stringify(obj, null, 2);
  const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
  const url = `file://${path}`;

  return RNFS.writeFile(path, content, 'utf8').then(() => Share.open({
    url,
    title: 'Export data', // DICTIONARY
    subject: filename,
    type: 'text/plain',
  }));
}
