import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, InteractionManager } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSelector } from '../../redux/selectors';
import { deleteWorkSession, deleteSubjects } from '../../redux/actions';
import { Memoizer } from '../../shared/utils';
import { sumSubjectTimesCalc, getEmptyStats } from '../../shared/timeCalculators';
import { HeaderActions } from '../../shared/UI/headers';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';

export class SubjectShow extends React.Component {
  state = {
    isLoading: true,
    timeStats: getEmptyStats(),
  }
  memoizer = Memoizer();

  componentDidMount() {
    this.sumTimesOnFocusListener = this.props.navigation.addListener(
      'focus',
      this.sumTimes,
    );

    const { subjectName } = this.props.route.params;

    const editSubjectAction = {
      icon: 'edit',
      handlePress: this.goEditSubject,
    };

    this.props.navigation.setOptions({
      title: subjectName,
      headerRight: () => <HeaderActions actions={[editSubjectAction]} />,
    });
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
    if (this.sumTimesOnFocusListener) {
      this.sumTimesOnFocusListener();
    }
  }

  handleDeleteWorkSession = (id) => {
    alertDelete({
      title: i18n.t('deletion.deleteWorkSessionQuestion'),
      toastMessage: i18n.t('deletion.workSessionDeleted'),
      onDelete: () => {
        this.props.deleteWorkSession(id);
        this.sumTimes();
      },
    });
  }

  sumTimes = () => {
    const { subject } = this.props;

    if (!this.memoizer.hasChanged(subject)) {
      return;
    }

    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }

    InteractionManager.runAfterInteractions(() => {
      sumSubjectTimesCalc(subject, null, null)
        .then((timeStats) => this.setState({
          isLoading: false,
          timeStats,
        }));
    });
  }

  goEditSubject = () => {
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
          lastSession={lastSession}
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          nDaysWorked={nDaysWorked}
          isLoading={isLoading}
        />
        <WorkSessionsListComponent
          subject={subject}
          workSessions={workSessions}
          onPressDelete={this.handleDeleteWorkSession}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subject: subjectSelector(state, {
    subjectId: ownProps.route.params && ownProps.route.params.subjectId,
  }),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteSubjects,
  deleteWorkSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectShow);
