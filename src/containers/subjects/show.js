import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  SubjectTimesSummary, SubjectInfo, SubjectShowComponent, GoToWorkSessions,
} from '../../components/subjects/show';
import {
  subjectWithCategoryInfoSelector, wsSetBySubjectSelector,
} from '../../redux/selectors';
import { HeaderActions } from '../../shared/UI/headers';

import { sumWSSetTimes } from '../../shared/timeCalculators';

const SubjectShow = ({ navigation, route }) => {
  const [timeStats, setTimeStats] = useState(null);

  const subjectId = route.params && route.params.subjectId;
  const params = { subjectId };

  const subject = useSelector((state) => subjectWithCategoryInfoSelector(state, params));

  const wsSet = useSelector((state) => wsSetBySubjectSelector(state, params));

  const lastSession = wsSet && wsSet.last();
  const nWorkSessions = wsSet ? wsSet.count() : 0;

  const { timeTotal, timeEffective } = timeStats || { timeTotal: 0, timeEffective: 0 };

  const goWorkSessionList = useCallback(() => {
    navigation.navigate('listWorkSessions', { subjectId: subject.id });
  }, [subject]);

  useEffect(async () => {
    setTimeStats(null);
    const newTimeStats = await sumWSSetTimes(wsSet);
    setTimeStats(newTimeStats);
  }, [wsSet]);

  useEffect(() => {
    const editSubjectAction = {
      icon: 'edit',
      handlePress: () => navigation.navigate('editSubject', { subjectId: subject.id }),
    };

    navigation.setOptions({
      headerRight: () => <HeaderActions actions={[editSubjectAction]} />,
    });
  }, [subject]);

  return (
    <SubjectShowComponent>
      <SubjectInfo subject={subject} />
      <SubjectTimesSummary
        lastSession={lastSession}
        timeTotal={timeTotal}
        timeEffective={timeEffective}
        isLoading={timeStats == null}
      />
      <GoToWorkSessions
        count={nWorkSessions}
        onPress={goWorkSessionList}
      />
    </SubjectShowComponent>
  );
};

export default SubjectShow;
