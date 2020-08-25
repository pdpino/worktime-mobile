import './mocks';

// NOTE: This disables custom warnings on testing.

/* eslint-disable no-console */
const originalErrorFn = console.error.bind(console.error);

const ignoreErrors = [
  // Add strings here...
];

jest.spyOn(console, 'error').mockImplementation((...args) => {
  const string = args.join(' ');
  const shouldIgnore = ignoreErrors.some((str) => string.match(str));
  if (!shouldIgnore) {
    originalErrorFn(...args);
  }
});
