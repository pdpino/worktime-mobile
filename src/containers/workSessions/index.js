import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkSessionsListComponent from '../../components/workSessions/list';
import {
  subjectSelector, workSessionsBySubjectSelector,
} from '../../redux/selectors';
import { deleteWorkSession } from '../../redux/actions';
// import { HeaderActions } from '../../shared/UI/headers';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';

const WorkSessionList = ({ route }) => {
  const subject = useSelector((state) => subjectSelector(state, {
    subjectId: route.params && route.params.subjectId,
  }));

  const workSessions = useSelector((state) => workSessionsBySubjectSelector(state, {
    subjectId: route.params && route.params.subjectId,
  }));

  const dispatch = useDispatch();

  const handleDeleteWorkSession = useCallback((id) => {
    alertDelete({
      title: i18n.t('deletion.deleteWorkSessionQuestion'),
      toastMessage: i18n.t('deletion.workSessionDeleted'),
      onDelete: () => {
        dispatch(deleteWorkSession(id));
      },
    });
  }, [deleteWorkSession, dispatch]);

  return (
    <WorkSessionsListComponent
      subject={subject}
      workSessions={workSessions}
      onPressDelete={handleDeleteWorkSession}
    />
  );
};

export {
  // eslint-disable-next-line import/prefer-default-export
  WorkSessionList,
};
