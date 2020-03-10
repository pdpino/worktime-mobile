import { prettySpanFunctions } from './common';
import i18n from '../../i18n';

function translateDateShifts(key, shifted) {
  let shiftedKey = null;
  if (shifted === 0) shiftedKey = 'today';
  else if (shifted === 1) shiftedKey = 'tomorrow';
  else if (shifted === -1) shiftedKey = 'yesterday';
  else if (shifted > 0) shiftedKey = 'positive';
  else shiftedKey = 'negative';

  return i18n.t(['dateShifts', key, shiftedKey], {
    count: Math.abs(shifted),
  });
}

// eslint-disable-next-line import/prefer-default-export
export function prettyShortcutSelection(key, shifted) {
  if (!prettySpanFunctions[key]) return i18n.t('datePeriods.infinite');

  return translateDateShifts(key, shifted);
}
