import React from 'react';
import i18n from '../../../shared/i18n';
import { SubmitButton } from '../../../shared/UI/buttons';

const ImportButton = ({ isImporting, canPressImport, onPressImport }) => (
  <SubmitButton
    text={i18n.t('porting.import')}
    isLoading={isImporting}
    disabled={!canPressImport}
    onPress={onPressImport}
  />
);

export default ImportButton;
