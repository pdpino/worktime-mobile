export default {
  all: 'All',
  archive: 'Archive',
  cancel: 'Cancel',
  dashboard: 'Dashboard',
  device: 'Device',
  empty: 'Empty',
  error: 'Error',
  files: 'Files',
  file: 'File',
  never: 'Never',
  new: 'new',
  none: 'None',
  ok: 'Ok',
  old: 'old',
  profile: 'Profile',
  save: 'Save',
  settings: 'Settings',
  status: 'Status',
  summary: 'Summary',
  week: 'Week',
  worktimeVersion: 'Worktime version %{version}',
  work: 'Work',
  formFields: {
    name: 'Name',
    alias: 'Alias',
    shortName: 'Short name',
    description: 'Description',
    color: 'Color',
    shortAndMemorableName: 'Short and memorable name',
    workOnThisAndThat: 'Work on this and that...',
    deviceName: 'Device name',
  },
  entities: {
    categories: 'Categories',
    category: 'Category',
    noCategory: 'No category',
    subject: 'Subject',
    subjects: 'Subjects',
    subjectsSelected: 'Subjects selected',
    noSubjects: 'No subjects',
    nSubjects: '%{count} subjects',
    editSubject: 'Edit subject',
    editSubjects: 'Edit subjects',
    newSubject: 'New subject',
    noSessions: 'No sessions',
    workSessions: 'Work sessions',
    nSessions: {
      one: '%{count} session',
      other: '%{count} sessions',
    },
    noItems: 'No items',
  },
  deletion: {
    delete: 'Delete',
    deleteElementQuestion: 'Delete %{element}?',
    deleteQuestion: 'Delete?',
    deleteWorkSessionQuestion: 'Delete work session?',
    cantBeUndone: 'Can\'t be undone',
    discardSessionQuestion: 'Discard this session?',
    stopAndDiscard: 'Stop and discard',
    discarded: 'Discarded',
    deleted: 'Deleted',
    elementDeleted: '%{element} deleted',
    workSessionDeleted: 'Work session deleted',
    clear: 'Clear',
  },
  workPlayer: {
    playing: 'Working', // FIXME: the key is coupled with the WS status
    paused: 'Paused',
    stopped: 'Stopped',
    chooseSubject: 'Choose subject',
    workingOnSubject: 'Working on %{subject}',
    subjectPaused: '%{subject} paused',
  },
  porting: {
    import: 'Import',
    export: 'Export',
    importData: 'Import data',
    exportData: 'Export data',
    exportYourDataToFile: 'Export your data to a file',
    exportedOn: 'Exported on',
    selectFile: 'Select file',
    lastImported: 'Last imported',
    errors: {
      notJsonFile: 'Not a JSON file',
      noData: 'JSON file does not specify data',
    },
  },
  notif: {
    tapToGoToWorktime: 'Tap to go to worktime',
    actions: {
      pause: 'Pause',
      stop: 'Stop',
      resume: 'Resume',
    },
  },
  times: {
    effective: 'Effective',
    effectiveTime: 'Effective time',
    total: 'Total',
    totalTime: 'Total time',
    perDay: 'per day',
    perWeek: 'per week',
    worked: 'worked',
    firstDayWorked: 'First day worked',
    lastDayWorked: 'Last day worked',
    lastWorked: 'Last worked',
    daysWorked: 'Days worked',
    period: 'Period',
    nPauses: {
      one: '%{count} pause',
      other: '%{count} pauses',
    },
  },
  dates: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    thisWeek: 'This week',
    thisMonth: 'This month',
    thisSemester: 'This semester',
    allTime: 'All time',
  },
  datePeriods: {
    day: {
      one: '%{count} day',
      other: '%{count} days',
    },
    week: {
      one: '%{count} week',
      other: '%{count} weeks',
    },
    month: {
      one: '%{count} month',
      other: '%{count} months',
    },
    semester: {
      one: '%{count} semester',
      other: '%{count} semesters',
    },
    year: {
      one: '%{count} year',
      other: '%{count} years',
    },
    infinite: 'Infinite time',
    daily: 'Daily',
    weekly: 'Weekly',
  },
  dateShifts: {
    day: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      positive: '%{count} days ahead',
      negative: '%{count} days ago',
    },
    week: {
      today: 'This week',
      yesterday: 'Last week',
      tomorrow: 'Next week',
      positive: '%{count} weeks ahead',
      negative: '%{count} weeks ago',
    },
    month: {
      today: 'This month',
      yesterday: 'Last month',
      tomorrow: 'Next month',
      positive: '%{count} months ahead',
      negative: '%{count} months ago',
    },
    semester: {
      today: 'This semester',
      yesterday: 'Last semester',
      tomorrow: 'Next semester',
      positive: '%{count} semesters ahead',
      negative: '%{count} semesters ago',
    },
    year: {
      today: 'This year',
      yesterday: 'Last year',
      tomorrow: 'Next year',
      positive: '%{count} years ahead',
      negative: '%{count} years ago',
    },
  },
  dashboardLegend: {
    effective: 'effective',
    paused: 'paused',
  },
  weekView: {
    numberOfDays: 'Number of days',
  },
  iconCategories: {
    people: 'People',
    office: 'Office',
    school: 'School',
    lab: 'Lab',
    charts: 'Charts',
    audiovisual: 'Audiovisual',
    money: 'Money',
    dateTime: 'Time',
    medical: 'Medical',
    coding: 'Coding',
    technology: 'Tech',
    sports: 'Sports',
    transport: 'Transport',
    others: 'Others',
  },
};
