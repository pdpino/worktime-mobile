# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased


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
