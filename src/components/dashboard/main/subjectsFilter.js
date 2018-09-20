import React from 'react';
import {
  View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { prettyDuration } from '../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width, // HACK?
  },
  buttonContainer: {
    backgroundColor: '#BBBBBB',
    width: 80,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkboxIcon: {
    marginHorizontal: 3,
  },
  checkedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  uncheckedText: {
    color: 'black',
  },
});

const allButtonLabel = 'Select all';

const SubjectsFilter = ({
  subjectsSummaries, selectedSubjectsIds, onSelectSubject, onSelectAllSubjects,
}) => {
  const allButton = (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onSelectAllSubjects}
    >
      <Text style={styles.buttonText}>
        {allButtonLabel}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const timeTotal = prettyDuration(item.timeTotal);
    const timeEffective = prettyDuration(item.timeEffective);

    const checked = selectedSubjectsIds[item.id];

    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onSelectSubject(item.id)}
        checkedIcon="check-circle"
        uncheckedIcon="circle-thin"
      >
        <Icon
          name={checked ? 'check-square' : 'square'}
          type="feather"
          size={20}
          containerStyle={styles.checkboxIcon}
        />
        <Text style={checked ? styles.checkedText : styles.uncheckedText}>
          {item.name}
          {`${timeTotal} (${timeEffective})`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {allButton}
      <View style={styles.listContainer}>
        <FlatList
          data={subjectsSummaries}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          extraData={selectedSubjectsIds}
        />
      </View>
    </View>
  );
};

export default SubjectsFilter;
