import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import asModalWithButton from './modalWithButton';
import { getMediumColor } from '../../styles/palette';
import i18n from '../../i18n';

// NOTE: this component is really similar to ModalPicker,
// but is left as a separate component in case of future further modification

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

const DEFAULT_COLOR = 'gray';

const CategoryButton = ({
  categories, categoryId, buttonStyle, textStyle,
}) => {
  const category = categories && categories.find((item) => item.id === categoryId);
  const name = category ? category.name : i18n.t('none');
  const color = category ? category.color : DEFAULT_COLOR;

  return (
    <View style={buttonStyle}>
      <Text
        style={[
          textStyle,
          { color: getMediumColor(color) },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const CategoryPicker = ({
  categories, onValueChange, closeModal,
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        closeModal();
        if (onValueChange) {
          onValueChange(item.id);
        }
      }}
      delayPressIn={0}
    >
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            { color: getMediumColor(item.color || DEFAULT_COLOR) },
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={[
          ...(categories || []),
          { id: -1, name: i18n.t('none') },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default asModalWithButton(CategoryButton, CategoryPicker);
