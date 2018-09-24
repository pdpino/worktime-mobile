import React from 'react';
import {
  View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { HorizontalBar } from '../../../shared/UI/charts';
import { prettyDuration, prettyPercentage } from '../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width, // HACK?
  },
  allButtonContainer: {
    backgroundColor: '#BBBBBB',
    width: 80,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  allButtonText: {
    textAlign: 'center',
    color: 'black',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: 100,
  },
  checkboxIcon: {
    marginHorizontal: 3,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
  checkedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  uncheckedText: {
    color: 'black',
  },
  percentageText: {
    color: 'black',
    alignSelf: 'center',
    position: 'absolute', // HACK??
    right: 0,
    marginRight: 10,
  },
});

function getWidthUnits(data, key) {
  const deviceWidth = Dimensions.get('window').width;
  const maxWidthUsed = deviceWidth - 150; // FIXME: hardcoded

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
  subjectsSummaries, selectedSubjectsIds, subjectsTotal, onSelectSubject, onSelectAllSubjects,
}) => {
  const title = (
    <Text>
      {titleText}
    </Text>
  );

  const allButton = (
    <TouchableOpacity
      style={styles.allButtonContainer}
      onPress={onSelectAllSubjects}
    >
      <Text style={styles.allButtonText}>
        {allButtonLabel}
      </Text>
    </TouchableOpacity>
  );

  const widthMultiplier = getWidthUnits(subjectsSummaries, 'timeTotal');

  const renderItem = ({ item }) => {
    const { timeTotal, timeEffective } = item;
    const timePaused = timeTotal - timeEffective;

    const checked = selectedSubjectsIds[item.id];

    const button = (
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
        <Text style={[
          styles.text,
          checked ? styles.checkedText : styles.uncheckedText,
        ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    const percentage = (
      <Text style={styles.percentageText}>
        {prettyPercentage(timeTotal, subjectsTotal)}
      </Text>
    );

    return (
      <View style={styles.itemContainer}>
        {button}
        {checked && timeTotal > 0 && (
          <HorizontalBar
            totalValue={timeTotal}
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
