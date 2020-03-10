import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  item: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 25,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  categoryName: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

class SubjectsInfo extends React.PureComponent {
  static renderSubject(subject) {
    const categoryName = subject.category
      ? subject.category.name
      : i18n.t('entities.noCategory');
    const categoryText = ` (${categoryName})`;
    return (
      <View style={styles.item}>
        <Text style={styles.subjectName}>
          {subject.name}
        </Text>
        <Text style={styles.categoryName}>
          {categoryText}
        </Text>
      </View>
    );
  }

  render() {
    const { subjects } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('entities.subjectsSelected')}
          :
        </Text>
        <FlatList
          data={subjects}
          renderItem={({ item }) => SubjectsInfo.renderSubject(item)}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

export default SubjectsInfo;
