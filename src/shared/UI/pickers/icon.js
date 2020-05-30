import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, FlatList, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AssignableIcon, iconsList } from '../icons/assignable';
import { colors } from '../../styles';
import asModalWithButton from './modalWithButton';
import i18n from '../../i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  categoryName: {
    color: 'black',
    alignSelf: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconContainer: {
    margin: 10,
  },
});

const IconPicker = ({ icon: iconSelected, onSelect, closeModal }) => {
  const renderItem = ({ item }) => {
    const { icons, name } = item;

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryName}>{i18n.t(`iconCategories.${name}`)}</Text>
        <View style={styles.iconsContainer}>
          {icons.map((icon) => {
            const isSelected = icon.name === iconSelected;
            return (
              <TouchableOpacity
                key={icon.name}
                style={styles.iconContainer}
                onPress={() => {
                  closeModal();
                  onSelect(icon.name);
                }}
              >
                <Icon
                  {...icon.config}
                  color={isSelected ? colors.mainBlue : 'black'}
                  size={30}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={iconsList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={false}
      extraData={iconSelected}
    />
  );
};

export default asModalWithButton(AssignableIcon, IconPicker);
