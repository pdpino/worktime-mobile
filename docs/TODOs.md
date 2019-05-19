# TODOs
Next things to do

## [P1] Next feature: Importing/Exporting

### Export data from desktop to mobile
(In desktop):
* `work update`:
  - save the default device name to `admin.json` (name = laptop)
  - add `device: <device-name>` to every entry
* Export JSON files to mobile format (is the standard):
  - jobs must be stopped (`_entry = null`, `is_running = False`)
  - rename necessary fields
  - check that the timestamp represents the same time in python and JS


## New Features
* [P1] Archive/unarchive subjects
* Implement categories
* Complete about Porting feature:
  - Allow choosing device on export (this device only, or all)
  - Allow choosing device on import (main device only, or all)
* Nest subjects
* View with sprints (for each work session)
* Dashboard
  - "This semester" shortcut
  - Add total time to the right of the bars
* Work-player:
  - when discarding a work session, show a snackbar with feedback (was it
    deleted or not?).
* New (simpler) dashboard. Different summaries by:
  - today: total time, start hour of the day, top 3 subjects?
  - this week: total time, avg start hour, top 3 subjects?
  - this month: avg time by week, top 3 subjects?

## Styles
* [P2] Bottom bar avoid keyboard.
* [P2] Hide bottom bar on views other than main views (e.g. subject form).
* Improve submit button style
  - Use `SubmitButton` in the subject form
  - In `components/settings/importing.js`, the submit button has a hacky style
  to prevent left aligning the button (`alignSelf: center`). The submit button
  should center itself?
* Make `ViewSection` Component, that displays title and borders. Reuse style in
  dashboard, subject-show, etc.

## Develop
* [P2] Reinstall adbs and emulator (better with android studio?).
  - Create avd with bigger screen.
  - Install KVM accelerator for emulator, see
  https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux
* Force linter to have maximum line width = 80 chars. Fix the code to comply.
* Type-checking with flow
* Dictionary for strings (i18n)
* Dictionary for colors (?)
* Evaluate using https://medium.com/@andr3wjack/versioning-react-native-apps-407469707661
  to simplify deploying new versions

## Fixes
* [BUG] Delete orphan work-sessions (and sprints). May be leftovers from a
  bug fixed in 1.2.3-alpha.
* In `SubjectShow` make loading of work-sessions async.
* [BUG] when there is a session running, if you delete it's subject:
  - the `updateTimesService` keeps running on the back, so every minute (or the
    time that it takes to update), it throws an error because the workSession
    does not exist.
  - hack solution: in the reducer, check if the workSession exists before
    updating its time. Problem: this does not stop the service once the
    work-session is deleted (the service should be stopped!).
  - another solution: don't allow deleting a subject if there is a workSession
    running (that it belongs to that subject). Is reasonable, since you
    probably do not want to delete a subject that is running.
* Dashboard
  - date "Mon 12 Nov" overflows in date filter (although text is wrapping). It
    should always be in one line.

## Refactors
* Split `utils/dates.js` into multiple files (is too big by now).
* `componentDidMount`, `componentWillUnmount` and `shouldComponentUpdate` are
  copied in `SubjectShow` and `DashboardMain`. Can it be refactored/improved?
* `index.js` files in the folders look really bad.
  Is there a way to do `import/export *`?
* Optimize subject-show. (Review: how non-optimal is this?)
  Currently, two subjects are taken:
  - Whole subject is being passed as parameter via react-navigation.
  - Subject is being selected from the store in the `connect` method.
  What is used from the one passed as parameter:
  - `subject.name` is taken in `screens/SubjectShow`, to set the screen title.
  - `subject.id` is taken in `SubjectShowContainer`, to re-grab the whole
    subject from the store (redux-orm).
    Is done this way to properly update the component when deleting a
    work-session from the list (if the subject is not fetched from the store
    again, the subject is not updated).
* The player middleware is highly coupled, it contains logic for:
  - notifications service
  - update work-times service
  - side effect when opening app, update work-times
  But two or three middlewares may be too much?
* [REVIEW] When selecting redux-orm data, instead of using `array.sort()`,
  use `orderBy()`.
