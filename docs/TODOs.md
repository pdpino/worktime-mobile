# TODOs
Next things to do

## Next feature: Importing/Exporting

### Export data from mobile to desktop
* In desktop:
  - `work update`:
    + save the default device name to `admin.json` (name = laptop)
    + add `device: <device-name>` to every entry
  - `work import file.json`
    DO NOT IMPORT!
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
  - Export JSON files to mobile format (is the standard now):
    + jobs must be stopped (`_entry = null`, `is_running = False`)
    + rename necessary fields
    + check that the timestamp represents the same time in python and JS
  - send it manually through whatsapp/drive, etc

* In mobile:
  - Import from file (load a file from folders)
  - conciliate names (how??)
  - check that device name (the one globally defined in the JSON file) is
    different than the local one (saved in the app)
  - Import only work sessions with:
    + the same device name that the global one
    + If sprints are empty, that's fine (legacy code does not save sprints)



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

## Styles
* Make `ViewSection` Component, that displays title and borders. Reuse style in dashboard, subject-show, etc
* When creating a subject, the bottom bar is always above the keyboard. Hide it when the keyboard is up.
* Improve submit button style
  - Use `SubmitButton` in the subject form

## Develop
* Create avds:
  - android-23 and 5 inches (motoG)
* Type-checking with flow
* Dictionary for strings
* Dictionary for colors (?)
* Use https://medium.com/@andr3wjack/versioning-react-native-apps-407469707661 to simplify deploying new versions

## Fixes
* Delete orphan work-sessions (and sprints)
* In `SubjectShow` make loading of work-sessions async
* Bug: when there is a session running, if you delete it's subject:
  - the `updateTimesService` keeps running on the back, so every minute (or the time that it takes to update), it throws an error because the workSession does not exist.
  - hack solution: in the reducer, check if the workSession exists before updating its time
    Problem: this does not stop the service once the work-session is deleted (the service should be stopped!)
  - another solution: don't allow deleting a subject if there is a workSession running (that it belongs to that subject).
    Is reasonable, since you probably do not want to delete a subject that is running
* Dashboard
  - date "Mon 12 Nov" overflows in date filter (although text is wrapping). It should always be in one line

## Refactors
* `componentDidMount`, `componentWillUnmount` and `shouldComponentUpdate` are copied in `SubjectShow` and `DashboardMain`
* Split `utils/dates.js` into multiple files (is too big by now)
* Create class `TimeStats`; object that allows to record days worked, initial date, ending date, etc. It's passed down to `sumTimes()` (instead of `daysWorked` object) (useful to encapsulate behavior of times-summaries) (dashboard summary, subject summary, etc)
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
* When selecting redux-orm data, instead of using `array.sort()`, use `orderBy()`
