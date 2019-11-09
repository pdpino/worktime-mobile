const semesters = [
  {
    endMonth: 7,
    start: { month: 3, day: 1 },
    end: { month: 7, day: 31 },
  },
  {
    endMonth: 12,
    start: { month: 8, day: 1 },
    end: { month: 12, day: 10 },
  },
];

function getSemesterIndex(date) {
  const month = date.getMonth() + 1; // month index starts at 0
  return semesters.findIndex(({ endMonth }) => month <= endMonth);
}

export function getStartOfSemester() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const semesterMonth = currentMonth >= 8 ? 8 : 3;
  return new Date(today.getFullYear(), semesterMonth - 1, 1);
}

export function shiftSemesters(date, shift) {
  // shift: can only be -1 or 1
  // FIXME: this function is coupled with the Dashboard container
  const semesterIndex = getSemesterIndex(date);
  const nSemesters = semesters.length;
  let newIndex = semesterIndex + shift;
  let newYear = date.getFullYear();
  if (newIndex < 0) {
    newIndex = nSemesters + newIndex;
    newYear -= 1;
  } else if (newIndex >= nSemesters) {
    newIndex %= nSemesters;
    newYear += 1;
  }
  const newSemester = semesters[newIndex];
  return {
    initialDate: new Date(
      newYear,
      newSemester.start.month - 1,
      newSemester.start.day,
    ),
    endingDate: new Date(
      newYear,
      newSemester.end.month - 1,
      newSemester.end.day,
    ),
  };
}
