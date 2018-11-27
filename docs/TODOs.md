# TODOs
Next things to do

## Next feature: Export data from mobile to desktop
* In mobile:
  - Infrastructure to update the store when needed (in production)
  - Update the store, adding `device: 'mobile'` to each existing work-session
    + also, you could delete orphan work-sessions (and sprints)
      (how do I recognize them? subject null?)
  - Add a `porting` reducer (importing and exporting)
    + has a `lastExportedTimestamp` number, default value is 0
  - View to export (for now, in settings)
    + Choose: export all vs export since last exported
      (the second one is the default)
    + button to export, wait to finish
    + choose which app to share to (google drive, whatsapp, etc)
  - Generate json file with subjects, work-sessions and sprints (nested data)
    + don't include sprints (?), (desktop won't take them anyway)
    + only include stopped sessions
    + Save the greatest `timestampEnd` (the oldest work-session exported) to reducer
      (update `lastExportedTimestamp`)
  - Share file via the selected app

* In desktop:
  - `work update`:
    + prompt for device name (defaults to laptop)
    + save the device name to `admin.json`
    + add `device: <device-name>` to every entry
  - `work import file.json`
    + conciliate subject-job names:
      Create a dict: `clean(subjectName) => jobName`,
      where `clean()` takes out the accents and makes it lowercase
      Save the dict in `admin.json`
    + take each work-session from each subject, create entry with:
      ```
      obs = ""
      finished = True
      date = workSession.date
      n_pauses = workSession.nPauses
      total_time = workSession.timeTotal
      effective_time = workSession.timeEffective
      pause_time = workSession.timeTotal - timeEffective
      hi = unixToHour(timestampStart)
      hf = unixToHour(timestampEnd)
      device = workSession.device
      ```
    + Extend existing list with new one
    + sort the merged one (timsort should do it pretty well), and save job
    + save imported date and hour in `admin.json`
      `last_imported_hour`, `last_imported_date`


### Import to mobile from desktop
* In desktop:
  - Export same json files, considering:
    + jobs must be stopped (`_entry = null`, `is_running = False`)
    + after exporting, save date and last final hour (`hf`) (in `admin.json`)
      `last_exported_hour`, `last_exported_date`
    + when exporting, choose only those older than the last one
  - send it manually through whatsapp/drive, etc

* In mobile:
  - Import from file (react-native-fs can do this?)
  - conciliate names (how??)
  - Create method `subject.importJob(job)` (specific for jobs, in the future it will be legacy code)
  - Create method `WorkSession.importEntry(entry)`, copy:
    ```
    status = 'stopped'
    date = entry.date
    timestampStart = hourToUnix(date, hi)
    timestampEnd = hourToUnix(date, hf)
    timeTotal = entry.total_time
    timeEffective = entry.effective_time
    nPauses = entry.n_pauses
    sprints = []
    ```
    Sprints are empty, which means that there is no info about sprints.
    (In the future, edge case `sprints.length === 0` will have to be handled in the mobile app)



## New Features
* Nest subjects
* View with sprints (for each work session)
* Archive/unarchive subjects
* Dashboard
  - "This semester" shortcut
  - Add total time to the right of the bars
* Work-player:
  - when discarding a work session, show a mini-notification with feedback (was it deleted or not?)
  (how to display that?)

## Develop
* Type-checking with flow
* Dictionary for strings
* Dictionary for colors (?)

## Fixes
1. Extra re-renders, slow performance. Refactor?:
  - `componentDidMount`, `componentWillUnMount` and `shouldComponentUpdate` are copied in `SubjectShow` and `DashboardMain`
* Bug: when there is a session running, if you delete it's subject:
  - the `updateTimesService` keeps running on the back, so every minute (or the time that it takes to update), it throws an error because the workSession does not exist.
  - hack solution: in the reducer, check if the workSession exists before updating its time
    Problem: this does not stop the service once the work-session is deleted (the service should be stopped!)
  - another solution: don't allow deleting a subject if there is a workSession running (that it belongs to that subject).
    Is reasonable, since you probably do not want to delete a subject that is running
* In the list of subjects:
  - the add button is in top of a subject's "more" button (so you can't press it)
* Dashboard
  - date "Mon 12 Nov" overflows in date filter (although text is wrapping)

## Refactors
* Make `DashboardSection` Component, that displays title and borders. Reuse styles
* Split `utils/dates.js` into multiple files (is too big by now)
* Create class `TimeStats`; object that allows to record days worked, initial date, ending date, etc. It's passed down to `sumTimes()` (instead of `daysWorked` object) (useful to encapsulate behavior of times-summaries) (dashboard summary, subject summary, etc)
* Reuse `createOrmSelector()`. Also, there are selectors with really long names
* `index.js` files in the folders look really bad.
  Is there a way to do `import/export *`?
* Optimize subject-show. (Review: how non-optimal is this?)
  Currently:
  - Whole subject is being passed as parameter via react-navigation.
  - `subject.name` is taken in `screens/SubjectShow`, to set the screen title
  - `subject.id` is taken in `SubjectShowContainer`, to re-grab the whole subject from the store (redux-orm)
  Is done this way to properly update the component when deleting a work-session from the list (if the subject is not fetched from the store again, the subject is not updated)
* The player middleware is highly coupled, it contains logic for:
  - notifications service
  - update work-times service
  - side effect when opening app, update work-times
  But two or three middlewares may be too much?
