/**
 * Looks like horizontal tabs, though should not be used as tabs!
 * (to avoid confusion with bottomBarNavigator)
 *
 * Maybe rename? HorizontalSelector? similar?
 */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.lighterGray, // appears behind when you press
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

class Tabs extends React.Component {
  shouldComponentUpdate(nextProps) {
    // NOTE: the component does not support modifying props,
    // only selectedTabKey
    return nextProps.selectedTabKey !== this.props.selectedTabKey;
  }

  render() {
    const {
      tabs, selectedTabKey, onPressTab,
      containerStyle, tabContainerStyle,
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        {tabs.map((tabDef, index) => {
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
                  tabContainerStyle,
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
