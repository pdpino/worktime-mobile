import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Alert } from 'react-native';
import SubjectsListComponent from '../../components/subjects/list';
import { subjectsSelector } from '../../redux/selectors';
import { deleteSubject } from '../../redux/actions';
import { NewButton } from '../../shared/UI/buttons';

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);

    this.findSubject = this.findSubject.bind(this);
    this.handlePressDetailSubject = this.handlePressDetailSubject.bind(this);
    this.handlePressEditSubject = this.handlePressEditSubject.bind(this);
    this.handlePressDeleteSubject = this.handlePressDeleteSubject.bind(this);
    this.handlePressNewSubject = this.handlePressNewSubject.bind(this);
  }

  findSubject(id) {
    return this.props.subjects.find(subj => subj.id === id);
  }

  handlePressDetailSubject(id) {
    const subject = this.findSubject(id);
    if (subject) {
      this.props.navigation.navigate('showSubject', { subject });
    }
  }

  handlePressEditSubject(id) {
    const subject = this.findSubject(id);
    if (subject) {
      this.props.navigation.navigate('editSubject', { subject });
    }
  }

  handlePressDeleteSubject(id) {
    const subject = this.findSubject(id);
    // DICTIONARY
    Alert.alert(
      'Confirmation',
      `Are you sure you want to delete ${subject.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.deleteSubject(id) },
      ],
    );
  }

  handlePressNewSubject() {
    this.props.navigation.navigate('newSubject');
  }

  render() {
    const { subjects } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <SubjectsListComponent
          subjects={subjects}
          onPressDetail={this.handlePressDetailSubject}
          onPressEdit={this.handlePressEditSubject}
          onPressDelete={this.handlePressDeleteSubject}
        />
        <NewButton
          onPress={this.handlePressNewSubject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsList);
