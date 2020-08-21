import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted',
  'Warning: NetInfo has been extracted',
]);
