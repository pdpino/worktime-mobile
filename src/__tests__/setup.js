import './mocks';

// NOTE: This disables custom warnings on testing.

/* eslint-disable no-console */
const originalErrorFn = console.error.bind(console.error);

const ignoreErrors = [
  // These errors are caused by redux-offline and RN version mismatch:
  // RN deprecated NetInfo and Async Storage, and redux-offline hasn't
  // been updated to support this.
  'NetInfo has been extracted from react-native core',
  'Async Storage has been extracted from react-native core',
];

console.error = (message) => {
  const messageStr = message.toString();
  const shouldIgnore = ignoreErrors.some(str => messageStr.includes(str));
  if (!shouldIgnore) {
    originalErrorFn(message);
  }
};
