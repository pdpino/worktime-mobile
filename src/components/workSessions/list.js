import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import WorkSessionItem from './item';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
});

class WorkSessionsList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // NOTE: the subject is only passed as a prop to be used here
    // The workSessions array always change, since its re-calculated in
    // Subject.getWorkSessions()
    // (If any of the work-sessions change, the subject will change, hence
    // this component will get updated)
    return nextProps.subject !== this.props.subject;
  }

  render() {
    const { workSessions, onPressDelete } = this.props;
    const title = (
      <Text style={styles.title}>
        {i18n.t('entities.workSessions')}
      </Text>
    );

    const emptyComponent = (
      <Text style={styles.emptyList}>
        {i18n.t('entities.noSessions')}
      </Text>
    );

    return (
      <View style={styles.container}>
        {title}
        <FlatList
          data={workSessions}
          renderItem={({ item }) => (
            <WorkSessionItem
              workSession={item}
              onPressDelete={onPressDelete}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={emptyComponent}
          enableScroll={false}
        />
      </View>
    );
  }
}

export default WorkSessionsList;
