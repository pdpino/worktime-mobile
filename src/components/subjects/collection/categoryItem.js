import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import SubjectList from './subjectsList';
import { colors, getMediumColor } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 6,
  },
});

class CategoryItem extends React.PureComponent {
  render() {
    const {
      category, selectedSubjects,
      onPressSubject, onLongPressSubject, onPressCategory,
    } = this.props;

    const categoryName = (
      <Text
        style={[
          styles.categoryName,
          { color: getMediumColor(category.color) },
        ]}
      >
        {category.name}
      </Text>
    );

    const subjectsList = (
      <SubjectList
        subjects={category.subjects}
        selectedSubjects={selectedSubjects}
        categoryColor={category.color}
        onPressSubject={onPressSubject}
        onLongPressSubject={onLongPressSubject}
      />
    );

    return (
      <TouchableOpacity
        onPress={() => onPressCategory(category.id)}
      >
        <View style={styles.container}>
          {categoryName}
          {subjectsList}
        </View>
      </TouchableOpacity>
    );
  }
}

export default CategoryItem;
