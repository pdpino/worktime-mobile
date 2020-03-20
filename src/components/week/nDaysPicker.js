import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    // NOTE: passing these styles to FlatList as prop does not work as intended
    // i.e. items do not use full-width
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    color: 'gray',
    fontStyle: 'italic',
  },
  itemContainer: {
    marginVertical: 10,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});

// NOTE: This is defined in react-native-week-view
const availableNDaysValues = [1, 3, 7];

const NDaysPicker = ({ isVisible, onValueChange, closeModal }) => {
  const title = (
    <Text style={styles.title}>
      {i18n.t('weekView.numberOfDays')}
    </Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        closeModal();
        onValueChange(item);
      }}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.container}>
        {title}
        <View style={styles.listContainer}>
          <FlatList
            data={availableNDaysValues}
            keyExtractor={item => item.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NDaysPicker;
