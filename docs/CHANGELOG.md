# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
* Timezone support
* Bulk edit for subjects
* Edit button in SubjectShow
* Delete button in SubjectEdit

### Fixed
* Double tap was needed when keyboard is visible



## 1.9.4 - 2019-10-31
### Changed
* Improve Dashboard summary styles

### Fixed
* App reloading unnecessarily
* Deleting work-session bug
* When importing, work-sessions from all devices are imported



## 1.9.3 - 2019-10-30
### Added
* In dashboard, if a category is selected and the back button is pressed,
the category is unselected

### Changed
* Don't show "No category" in dashboard if it's empty
* When exporting, export all work sessions (not only the ones from this device)

### Fixed
* Buttons on notification
* Visual Feedback on subject items
* Make work-player responsive



## 1.9.2 - 2019-10-29
### Added
* When discarding a work session, show a Toast with feedback

### Changed
* Pause color in Dashboard

### Fixed
* Item overflow in subjects list



## 1.9.1 - 2019-10-29
### Added
* Error handler for production



## 1.9.1-beta - 2019-10-29
### Changed
* Minor Dashboard fixes and performance improvements in time-details

### Fixed
* Fix category alias update in other views



## 1.9.0 - 2019-10-28
### Added
* Add categories' tab to Dashboard



## 1.8.0 - 2019-10-25
### Changed
* In dashboard: improve date shortcut handling and overall date-filter styles

### Fixed
* Subject picker too large (x2)



## 1.7.5 - 2019-10-22
### Added
* "This semester" shortcut

### Changed
* Improve feedback when importing subjects

### Fixed
* Subject picker too large
* Empty name bug for subjects and categories



## 1.7.4 - 2019-08-18
### Fixed
* Subject Picker bugs:
  - When editing a category, the picker gets updated right away.
  - Make it a Dialog again (instead of a dropdown).



## 1.7.3 - 2019-08-05
### Changed
* Improve subjects list view.

### Fixed
* In the work player, in the list of subjects, display also the category name
from each subject.
* Same in the dashboard's subject list.
* Sort names considering lowercase letters.



## 1.7.2 - 2019-07-05
### Changed
* Shorten vibration on item selection (even more).



## 1.7.1 - 2019-07-05
### Changed
* Shorten vibration on item selection.
* In subjects list, move empty categories to the bottom.
* In work session list, add device name.

### Fixed
* In dashboard, fix bug that broke "None" behavior.
* In subjects list, fix visual feedback when touching a subject item.



## 1.7.0 - 2019-07-04
### Added
* Support categories for subjects.
  - Subjects now can be organized in categories. Subjects List reflects this.
* Add vibration when selecting subjects.

### Changed
* In subjects list, move Archive button to the header.
* Upgrade libraries versions:
  - React: 16.8.3
  - React native: 0.59.8
  - Babel: ^7.x.x

### Fixed
* Improve header actions performance (icons are pure components).
* When selecting subjects, back button clears selection.
* When importing, archived subjects are considered.
* When archiving or deleting a subject, if the subject was selected it gets
cleared.



## 1.6.0 - 2019-06-01
### Added
* Support archive/unarchive subjects

### Fixed
* Press and hold fixes:
  - Improve speed when selecting multiple subject
  - Fix deletion



## 1.5.0 - 2019-05-31
### Changed
* Press and hold a subject to edit or delete it

### Fixed
* Bottom tab bar now is hidden when:
  - Typing (so is not above the keyboard)
  - When navigating inside the stack (e.g. subject form)



## 1.4.0 - 2019-05-20
### Added
* Support importing data from JSON files
* Tests for some of the importing code

### Fixed
* On export, do not save ids or foreign keys, to avoid mixing them up on import



## 1.3.1 - 2019-05-08
### Added
* Loading spinner to the exporting process

### Fixed
* Minor UI fixes
  - Change pause button color to orange
  - Enlarge activity indicator in the splash screen
  - In the calendar picker, start the calendar in the selected date



## 1.3.0 - 2019-05-06
### Added
* Custom name to the device (configurable by the user)
* View in settings: Profile, edit the device name
* Complete the export feature: View in settings allows sharing a JSON file with
  another app (e.g. Google Drive). The file contains the user data.



## 1.3.0-alpha - 2018-12-10
### Added
* Store versioning
* View to export data

### Fixed
* "More" button of the last subject is now visible (it had the "new" button on top)



## 1.2.3-alpha.1 - 2018-12-04
### Changed
* Details displayed in dashboard can be about days or weeks

### Fixed
* Async time calculations (in subject-show and dashboard). Now they really are async
* Fix calculations bugs



## 1.2.3-alpha - 2018-11-27
### Changed
* Improve subjects and work-sessions styles (empty list styles)

### Fixed
* When deleting a subject, also delete its work-sessions (and sprints associated)
* When creating a new subject, it was not displayed immediately in the work-player subject-picker.
* Make time calculations async in the subject-show view and in dashboard
* Smarter re-rendering of subject-show and dashboard. Improves performance



## 1.2.2 - 2018-11-21
### Added
* Display time of last worked session in work-player

### Fixed
* Deciding when to update a bar in the dashboard



## 1.2.1-beta - 2018-11-21
### Added
* Display of total and effective times in the player (auto-updates every 1min)
* Button to delete a specific work session

### Fixed
* When a work session is deleted, also the associated sprints are deleted
* Fix updating of subject-show view, when changing a work-session (deleting or playing)



## 1.2.0-alpha - 2018-11-19
### Added
* Press and hold stop button: stop and discard the work-session (with a confirmation box)

### Changed
* Improve dashboard summary styles

### Fixed
* Percentage from total time was outside of borders (to the right)



## 1.1.0 - 2018-11-12
### Add
* In subject-show view (in summary) add total time, effective time and amount of days worked

### Changed
* Use Tabs instead of Drawer for navigation
* Dashboard:
  - Button to select all subjects is now a checkbox
  - Improve styles

### Fixed
* Fix bug that caused subject name to be "undefined" on the notification



## 1.0.2-alpha - 2018-11-02
### Added
* Dashboard features
  - Support selecting "None" for the dates filter

### Changed
* Dashboard styling
  - Put the Date filter first, then the Summary

### Fixed
* Dashboard bugs
  - "Last week" option now is Monday to Sunday (it was Monday to Monday)
  - Rerendering of the horizontal bars is smarter



## 1.0.1-alpha - 2018-10-03
### Fixed
* Set the initial view to Work, instead of Dashboard



## 1.0.0-alpha - 2018-10-03
### Added
* Basic dashboard view



## 0.2.0 - 2018-09-14
### Added
* Buttons in notifications to resume, pause and stop
* Added play and pause icons to notifications



## 0.1.0 - 2018-08-30
### Added
* Settings menu, with version number
* Notification to show the user if is playing or paused. Display only title



## 0.0.2 - 2018-08-23
### Fixed
* Fix bug when the selected subject is deleted
* Fix the last session display




## 0.0.1 - 2018-08-22
### Added
* Basic functionalities:
  - Subject's CRUD
  - Display worked sessions of a subject
  - Work Player: play, pause and stop a subject
