import { prettySpanFunctions } from './common';

// eslint-disable-next-line import/prefer-default-export
export function prettyShortcutSelection(selection) {
  // FIXME: this is coupled with the selection object from Dashboard
  const { key, shifted } = selection;

  const prettySpan = prettySpanFunctions[key];
  if (!prettySpan) return 'Infinite time'; // DICTIONARY, HACK: copied

  // DICTIONARY
  if (shifted === 0) {
    return key === 'day' ? 'Today' : `This ${key}`;
  }
  if (shifted === -1) {
    return key === 'day' ? 'Yesterday' : `Last ${key}`;
  }
  if (shifted === 1) {
    return key === 'day' ? 'Tomorrow' : `Next ${key}`;
  }

  return `${prettySpan(-shifted)} ago`;
}
