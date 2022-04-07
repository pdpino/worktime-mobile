import { AppRegistry, LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './App';
import NotificationsService from './src/services/notifications';
import { name as appName } from './app.json';

enableScreens();

NotificationsService.listenBackgroundEvents();

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);
