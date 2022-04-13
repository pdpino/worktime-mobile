import './async-storage';
import './netinfo';
import './react-native-device-info';
import './react-native-fs';
import './react-native-localize';
import './notifications';
import './react-native-reanimated';
import './react-native-share';
import helpers from './helpers';

jest.useFakeTimers();

global.helperMockBuilders = helpers;
