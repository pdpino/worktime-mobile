import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import SubjectList from './subjectsList';
import { colors, getStrongColor, getMediumColor } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lighterGray,
  },
  colorColumn: {
    borderLeftWidth: 8,
  },
  textColumn: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 0,
  },
  categoryName: {
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 3,
  },
});

class CategoryItem extends React.PureComponent {
  render() {
    const {
      category, selectedSubjects,
      onPressSubject, onLongPressSubject, onPressCategory,
    } = this.props;

    const colorColumn = (
      <View
        style={[
          styles.colorColumn,
          { borderColor: getStrongColor(category.color) },
        ]}
      />
    );

    const textColumn = (
      <View style={styles.textColumn}>
        <Text
          style={[
            styles.categoryName,
            { color: getMediumColor(category.color) },
          ]}
        >
          {category.name}
        </Text>
        <SubjectList
          subjects={category.subjects}
          selectedSubjects={selectedSubjects}
          categoryColor={category.color}
          onPressSubject={onPressSubject}
          onLongPressSubject={onLongPressSubject}
        />
      </View>
    );

    return (
      <TouchableOpacity
        onPress={() => onPressCategory(category.id)}
      >
        <View style={styles.container}>
          {colorColumn}
          {textColumn}
        </View>
      </TouchableOpacity>
    );
  }
}

export default CategoryItem;
