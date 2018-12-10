import Share from 'react-native-share';
import { Buffer } from 'buffer';

export default function share(filename, obj) {
  const encoded = Buffer.from(JSON.stringify(obj)).toString('base64');

  return Share.open({
    url: `data:text/json;base64,${encoded}`,
    title: 'Export data', // DICTIONARY
    subject: `${filename}.json`,
    type: 'text/plain',
  });
}
