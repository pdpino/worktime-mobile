import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import i18n from '../../../shared/i18n';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.lighterGray,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: 'white',
    borderColor: colors.mainBlue,
    borderBottomWidth: 1,
  },
  tabContainerSelected: {
    elevation: 1,
    borderBottomWidth: 3,
    borderColor: colors.mainBlue,
  },
  textContainerSelected: {
    fontWeight: 'bold',
  },
  text: {
    color: colors.mainBlue,
    fontSize: 18,
  },
});

const tabsDefinition = [
  {
    key: 'categories',
    getLabel: () => i18n.t('entities.categories'),
  },
  {
    key: 'subjects',
    getLabel: () => i18n.t('entities.subjects'),
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
              delayPressIn={0}
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
                  {tabDef.getLabel()}
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
