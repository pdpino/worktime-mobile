import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { getLightColor, getMediumColor } from '../../../shared/styles';
import i18n from '../../../shared/i18n';
import { AssignableIcon } from '../../../shared/UI/icons/assignable';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
});

const SubjectInfo = ({ subject }) => {
  const {
    name, icon, color, description, categoryName, categoryId,
  } = (subject || {});

  // FIXME: gray is hardcoded
  const categoryText = categoryId === -1 ? (
    <Text style={[styles.text, { color: getMediumColor('gray') }]}>
      {`(${i18n.t('entities.noCategoryLower')})`}
    </Text>
  ) : (
    <Text style={[styles.text, { color: getMediumColor(color) }]}>
      {categoryName}
    </Text>
  );

  return (
    <View style={[styles.container, styles.row]}>
      <AssignableIcon
        name={name}
        icon={icon}
        color={getLightColor(color)}
        size={44}
      />
      <View style={styles.column}>
        <Text style={styles.name}>
          {name}
        </Text>
        {categoryText}
        {description && (
          <Text style={styles.description}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
};

export default React.memo(SubjectInfo);
