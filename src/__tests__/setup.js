import './mocks';

// NOTE: This disables custom warnings on testing.

const ignoreErrors = [
  // Add strings here...
];

if (ignoreErrors && ignoreErrors.length > 0) {
  /* eslint-disable no-console */
  const originalErrorFn = console.error.bind(console.error);

  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const string = args.join(' ');
    const shouldIgnore = ignoreErrors.some((str) => string.match(str));
    if (!shouldIgnore) {
      originalErrorFn(...args);
    }
  });
}
