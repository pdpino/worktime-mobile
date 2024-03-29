export * from './palette';

const colors = {
  red: '#d50000',
  orange: '#ef8c00',
  darkGray: '#1f1f1f',
  lightGray: '#b3b3b3',
  lighterGray: '#dedede',
  evenLighterGray: '#f1f1f1',
  boxBackground: '#e8eaf6',
  deletionRedLighter: '#d8463b',
  deletionRed: '#d50000',
  selectedSubject: '#71b3e74A',
  selectedSubjectUnderlay: '#71b3e75F',
  darkBlue: '#005885',
  mainBlue: '#3B84B5',
  lightBlue: '#71b3e7',
  enabledSubmitButton: '#2196F3',
  spinner: '#e48a0b',
};

const timeColors = {
  total: 'green',
  effective: '#4fb3bf',
  paused: '#e48a0b',
};

const status2Color = {
  playing: 'green',
  paused: 'orange',
  stopped: 'red',
};

export {
  colors,
  status2Color,
  timeColors,
};
