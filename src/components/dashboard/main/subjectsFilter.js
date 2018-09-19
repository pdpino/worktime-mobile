import React from 'react';
import {
  View, StyleSheet, FlatList, Dimensions,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { prettyDuration } from '../../../shared/utils';

const styles = StyleSheet.create({
  listContainer: {
    width: Dimensions.get('window').width, // HACK?
  },
});

const SubjectsFilter = ({ subjects, selectedSubjectsIds, onSelectSubject }) => {
  const renderItem = ({ item }) => {
    const timeTotal = prettyDuration(item.timeTotal);
    const timeEffective = prettyDuration(item.timeEffective);

    return (
      <CheckBox
        onPress={() => onSelectSubject(item.id)}
        checked={selectedSubjectsIds[item.id]}
        title={`${item.name}, ${timeTotal} (${timeEffective})`}
        checkedIcon="check-circle"
        uncheckedIcon="circle-thin"
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={subjects}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={selectedSubjectsIds}
      />
    </View>
  );
};

export default SubjectsFilter;
