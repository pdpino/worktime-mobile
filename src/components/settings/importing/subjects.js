import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import { ItemCheckbox } from '../../../shared/UI/buttons';
import { timeToPrettyDate } from '../../../shared/dates';
import i18n from '../../../shared/i18n';
import { colors } from '../../../shared/styles';
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
    flex: 0,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginVertical: 1,
  },
  subjectOld: {
    backgroundColor: colors.lightBlue,
  },
  subjectNew: {
    backgroundColor: colors.orange,
  },
});

const SubjectsPreview = ({
  processedSubjects, subjectsSelection, onPressSubject,
}) => {
  if (!processedSubjects) {
    return null;
  }
  const subjectsAmount = processedSubjects && processedSubjects.length;
  const title = (
    <Text style={styles.title}>
      {i18n.t('entities.nSubjects', { count: subjectsAmount })}
    </Text>
  );

  const renderSubjectPreview = ({ item }) => {
    const { metadata, data } = item;
    const fromDate = timeToPrettyDate(metadata.minTimestamp);
    const toDate = timeToPrettyDate(metadata.maxTimestamp);
    const period = `${fromDate} - ${toDate}`;

    const nSessions = i18n.t('entities.nSessions', { count: metadata.accepted });
    const text = `${data.name} (${nSessions})`;
    const innerComponent = (
      <View>
        <Text style={{ color: 'black' }}>
          {text}
        </Text>
        <Text>
          {period}
        </Text>
      </View>
    );

    return (
      <View style={styles.subjectItem}>
        <ItemCheckbox
          innerComponent={innerComponent}
          checked={subjectsSelection && subjectsSelection[data.name]}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.subjectName}
          onPress={() => onPressSubject(data.name)}
        />
        <View style={[
          styles.subjectBadge,
          metadata.exists ? styles.subjectOld : styles.subjectNew,
        ]}
        >
          <Text>
            {metadata.exists ? i18n.t('old') : i18n.t('new')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[commonStyles.box, styles.container]}>
      {title}
      <FlatList
        data={processedSubjects}
        renderItem={renderSubjectPreview}
        keyExtractor={(item, index) => index.toString()}
        extraData={subjectsSelection}
      />
    </View>
  );
};

export default React.memo(SubjectsPreview);
