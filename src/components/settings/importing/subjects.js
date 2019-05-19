import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import { ItemCheckbox } from '../../../shared/UI/buttons';
import commonStyles from './styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    padding: 5,
  },
  title: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  checkboxContainer: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
  },
  subjectBadge: {
    borderRadius: 5,
    paddingHorizontal: 5,
    marginVertical: 1,
  },
  subjectOld: {
    backgroundColor: '#9BBBFF',
  },
  subjectNew: {
    backgroundColor: '#EF8C00',
  },
});

// DICTIONARY
const subjectsLabel = 'subjects';

const SubjectsPreview = ({
  subjectsPreview, selectedSubjects, onPressSubject,
}) => {
  const amountOfSubjects = subjectsPreview && subjectsPreview.length;
  const title = (
    <Text style={styles.title}>
      {`${amountOfSubjects} ${subjectsLabel}`}
    </Text>
  );

  const renderSubjectPreview = ({ item }) => (
    <View style={styles.subjectItem}>
      <ItemCheckbox
        text={item.name}
        checked={selectedSubjects && selectedSubjects[item.name]}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.subjectName}
        onPress={() => onPressSubject(item.name)}
      />
      <View style={
        [
          styles.subjectBadge,
          item.exists ? styles.subjectOld : styles.subjectNew,
        ]}
      >
        <Text>
          {item.exists ? 'old' : 'new'}
        </Text>
      </View>
    </View>
  );

  return subjectsPreview ? (
    <View style={[commonStyles.box, styles.container]}>
      {title}
      <FlatList
        data={subjectsPreview}
        renderItem={renderSubjectPreview}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedSubjects}
        scrollEnabled={false}
      />
    </View>
  ) : null;
};

export default SubjectsPreview;
