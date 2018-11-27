import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSelector } from '../../redux/selectors';
import { deleteWorkSession } from '../../redux/actions';
import { TimeStats, Memoizer } from '../../shared/utils';

class SubjectShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeStats: new TimeStats(),
      isLoading: true,
    };

    this.handleDeleteWorkSession = this.handleDeleteWorkSession.bind(this);
    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.sumTimes);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  handleDeleteWorkSession(id) {
    // DICTIONARY
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the work session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteWorkSession(id);
            this.sumTimes();
          },
        },
      ],
    );
  }

  sumTimes() {
    const { subject } = this.props;

    if (!this.memoizer.hasChanged(subject)) {
      return;
    }

    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }

    const timeStats = new TimeStats();
    timeStats.sumSubjectTimes(subject, null, null);
    this.setState({
      timeStats,
      isLoading: false,
    });
  }

  render() {
    const { subject } = this.props;
    const workSessions = subject.getWorkSessions({ sorted: true }); // REVIEW: make this call async?
    const lastSession = workSessions[0];
    const { timeStats, isLoading } = this.state;
    const { timeTotal, timeEffective, nDaysWorked } = timeStats.getStats();

    return (
      <ScrollView>
        <SubjectInfoComponent
          lastWorkedDate={lastSession && lastSession.date}
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          nDaysWorked={nDaysWorked}
          isLoading={isLoading}
        />
        <WorkSessionsListComponent
          workSessions={workSessions}
          listProps={{ enableScroll: false }}
          onPressDelete={this.handleDeleteWorkSession}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id: subjectId } = ownProps.navigation.getParam('subject');
  // OPTIMIZE (see TODOs)
  return {
    subject: subjectSelector(state, { subjectId }),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteWorkSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectShow);
