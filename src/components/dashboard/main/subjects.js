import React from 'react';
import {
  View, StyleSheet, FlatList, Dimensions, Text,
} from 'react-native';
import { HorizontalBar } from '../../../shared/UI/charts';
import { ItemCheckbox } from '../../../shared/UI/buttons';
import { prettyDuration, prettyPercentage } from '../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 7,
    marginVertical: 7,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  title: {
    color: 'black',
    marginBottom: 5,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width, // HACK?
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  allButtonContainer: {
    width: 200,
  },
  checkboxContainer: {
    width: 100,
  },
  percentageText: {
    color: 'black',
    alignSelf: 'center',
    position: 'absolute', // HACK??
    right: 0,
    marginRight: 25,
  },
});

function getWidthUnits(data, key) {
  const deviceWidth = Dimensions.get('window').width;
  const maxWidthUsed = deviceWidth - 165; // FIXME: hardcoded

  const maxValue = Math.max(...data.map(item => item[key]));

  return maxWidthUsed / maxValue;
}

// DICTIONARY
const allButtonLabel = 'Select all';
const titleText = 'Subjects';

// DICTIONARY COLORS
const colorEffective = '#4fb3bf';
const colorPaused = '#bdbdbd';

const SubjectsDetail = ({
  subjectsSummaries, selectedSubjectsIds, allSubjectsSelected, subjectsTimeTotal,
  onSelectSubject, onSelectAllSubjects,
}) => {
  const title = (
    <Text style={styles.title}>
      {titleText}
    </Text>
  );

  const allButton = (
    <ItemCheckbox
      text={allButtonLabel}
      checked={allSubjectsSelected}
      containerStyle={styles.allButtonContainer}
      onPress={onSelectAllSubjects}
    />
  );

  const widthMultiplier = getWidthUnits(subjectsSummaries, 'timeTotal');

  const renderItem = ({ item }) => {
    const { timeTotal, timeEffective } = item;
    const timePaused = timeTotal - timeEffective;

    const checked = selectedSubjectsIds[item.id];

    const checkbox = (
      <ItemCheckbox
        text={item.name}
        checked={checked}
        containerStyle={styles.checkboxContainer}
        onPress={() => onSelectSubject(item.id)}
      />
    );

    const percentage = (
      <Text style={styles.percentageText}>
        {prettyPercentage(timeTotal, subjectsTimeTotal)}
      </Text>
    );

    return (
      <View style={styles.itemContainer}>
        {checkbox}
        {checked && timeTotal > 0 && (
          <HorizontalBar
            totalValue={timeTotal * widthMultiplier}
            values={[
              {
                width: timeEffective * widthMultiplier,
                text: prettyDuration(timeEffective),
              },
              {
                width: timePaused * widthMultiplier,
                text: prettyDuration(timePaused),
              },
            ]}
            colors={[colorEffective, colorPaused]}
          />
        )}
        {checked && timeTotal > 0 && percentage}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {title}
      {allButton}
      <View style={styles.listContainer}>
        <FlatList
          data={subjectsSummaries}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          extraData={selectedSubjectsIds}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default SubjectsDetail;
