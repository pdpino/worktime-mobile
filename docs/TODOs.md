# TODOs
Next things to do

## New Features
1. Option to export data to file
* Nest subjects
* View with sprints (for each work session)
* Archive/unarchive subjects
* Dashboard
  - "This semester" shortcut
  - Add total time to the right of the bars
* Work-player:
  - when discarding a work session, show a mini-notification with feedback (was it deleted or not?)
  (how to display that?)

## Style
* Style for `emptyComponent`s in `FlatList`s (no subjects and no sessions)
* Use a lighter color as division for items in lists
* Add some padding for items in subjects-list

## Develop
* Type-checking with flow
* Dictionary for strings
* Dictionary for colors (?)

## Fixes
* In the list of subjects:
  - the add button is in top of a subject's "more" button (so you can't press it)
* Dashboard
  - date "Mon 12 Nov" overflows in date filter (although text is wrapping)

## Refactors
* Make `DashboardSection` Component, that displays title and borders. Reuse styles
* Split `utils/dates.js` into multiple files (is too big by now)
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
