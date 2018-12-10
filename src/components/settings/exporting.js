import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import { prettyDate, unixToHour } from '../../shared/utils';
import { ItemCheckbox, SubmitButton } from '../../shared/UI/buttons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    marginVertical: 10,
  },
  lastExported: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  lastExportedText: {
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

// DICTIONARY
const lastExportedLabel = 'Last exported';
const optionLabels = {
  everything: 'Everything',
  lastExported: 'Since last exported',
};
const exportLabel = 'Export';
const neverLabel = 'Never';


const Exporting = ({
  lastExportedTimestamp, options, selectedOptionKey, onPressOption, onPressShare,
}) => {
  const lastExportedDate = lastExportedTimestamp
    ? `${prettyDate(lastExportedTimestamp)}, ${unixToHour(lastExportedTimestamp)}`
    : neverLabel;

  const lastExportedRow = (
    <View style={[styles.row, styles.lastExported]}>
      <Text style={[styles.lastExportedText, styles.text]}>
        {lastExportedLabel}
        :
      </Text>
      <Text style={[styles.lastExportedText, styles.text]}>
        {lastExportedDate}
      </Text>
    </View>
  );

  const renderOption = option => (
    <ItemCheckbox
      text={optionLabels[option.key]}
      checked={option.key === selectedOptionKey}
      onPress={() => onPressOption(option.key)}
    />
  );

  const optionsRow = (
    <View style={styles.row}>
      <Text style={styles.text}>
        {exportLabel}
        :
      </Text>
      <FlatList
        data={options}
        renderItem={({ item }) => renderOption(item)}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedOptionKey}
      />
    </View>
  );

  const button = (
    <View style={[styles.row, styles.buttonContainer]}>
      <SubmitButton
        text={exportLabel}
        onPress={onPressShare}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {lastExportedRow}
      {optionsRow}
      {button}
    </View>
  );
};

export default Exporting;
