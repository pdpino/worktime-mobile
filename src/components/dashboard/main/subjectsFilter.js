import React from 'react';
import {
  View, StyleSheet, FlatList, Dimensions, Button,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { prettyDuration } from '../../../shared/utils';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width, // HACK?
  },
});

const SubjectsFilter = ({
  subjectsSummaries, selectedSubjectsIds, onSelectSubject, onSelectAllSubjects,
}) => {
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
      <Button
        title="Select all"
        onPress={onSelectAllSubjects}
      />
      <FlatList
        data={subjectsSummaries}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={selectedSubjectsIds}
      />
    </View>
  );
};

export default SubjectsFilter;
