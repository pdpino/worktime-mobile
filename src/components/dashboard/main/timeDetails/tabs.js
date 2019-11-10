import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';

// COLORS
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
    paddingVertical: 8,
    backgroundColor: 'white',
    borderColor: '#3B84B5',
    borderBottomWidth: 1,
  },
  tabContainerSelected: {
    elevation: 1,
    borderBottomWidth: 3,
    borderColor: '#3B84B5',
  },
  textContainerSelected: {
    fontWeight: 'bold',
  },
  text: {
    color: '#3B84B5',
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
        {tabsDefinition.map((tabDef, index) => {
          const isSelected = tabDef.key === selectedTabKey;
          return (
            <TouchableOpacity
              style={{ flex: 1 }}
              key={index.toString()}
              onPress={() => onPressTab(tabDef.key)}
            >
              <View
                style={[
                  styles.tabContainer,
                  isSelected && styles.tabContainerSelected,
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    isSelected && styles.textContainerSelected,
                  ]}
                >
                  {tabDef.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default Tabs;
