import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSelector } from '../../redux/selectors';
import { deleteWorkSession, deleteSubjects } from '../../redux/actions';
import { Memoizer } from '../../shared/utils';
import { sumSubjectTimesCalc, getEmptyStats } from '../../shared/timeCalculators';
import { HeaderActions } from '../../shared/UI/headers';

class SubjectShow extends React.Component {
  static navigationOptions({ navigation }) {
    const { subjectName } = navigation.state.params;

    const actions = [
      {
        icon: 'edit',
        handlePress: navigation.getParam('goEditSubject'),
      },
    ];

    return {
      title: subjectName || 'Subject', // DICTIONARY
      headerRight: <HeaderActions actions={actions} />,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      timeStats: getEmptyStats(),
    };

    this.handleDeleteWorkSession = this.handleDeleteWorkSession.bind(this);
    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();

    this.goEditSubject = this.goEditSubject.bind(this);

    this.props.navigation.setParams({
      goEditSubject: this.goEditSubject,
    });
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.sumTimes);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentDidUpdate(prevProps) {
    // HACK:
    // From this view u can navigate to 'editSubject', change the subject name,
    // and comeback to this view. If that happens, the header title must be
    // updated
    const { subject } = this.props;
    const prevName = prevProps.subject && prevProps.subject.name;
    const newName = subject && subject.name;
    if (prevName !== newName) {
      this.props.navigation.setParams({ subjectName: newName });
    }
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

    sumSubjectTimesCalc(subject, null, null)
      .then(timeStats => this.setState({
        isLoading: false,
        timeStats,
      }));
  }

  goEditSubject() {
    const { subject } = this.props;
    this.props.navigation.navigate('editSubject', { subject });
  }

  render() {
    const { subject } = this.props;
    const workSessions = subject.getWorkSessions({ sorted: true }); // REVIEW: make this call async?
    const lastSession = workSessions[0];

    const { timeStats, isLoading } = this.state;
    const { timeTotal, timeEffective, nDaysWorked } = timeStats;

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
          onPressDelete={this.handleDeleteWorkSession}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subject: subjectSelector(state, {
    subjectId: ownProps.navigation.getParam('subjectId'),
  }),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSubjects,
  deleteWorkSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectShow);
