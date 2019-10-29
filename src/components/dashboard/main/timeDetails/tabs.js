import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#efefef',
  },
  tabContainerSelected: {
    borderBottomWidth: 5,
    borderColor: '#005885',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
});

const tabsDefinition = [
  {
    key: 'categories',
    label: 'Categories', // DICTIONARY
  },
  {
    key: 'subjects',
    label: 'Subjects', // DICTIONARY
  },
];

class Tabs extends React.PureComponent {
  render() {
    const { selectedTabKey, onPressTab } = this.props;

    return (
      <View style={styles.container}>
        {tabsDefinition.map((tabDef, index) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            key={index.toString()}
            onPress={() => onPressTab(tabDef.key)}
          >
            <View
              style={[
                styles.tabContainer,
                tabDef.key === selectedTabKey && styles.tabContainerSelected,
              ]}
            >
              <Text style={styles.text}>
                {tabDef.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default Tabs;
