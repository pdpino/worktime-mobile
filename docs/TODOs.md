# TODOs
Next things to do

## Fixes
* In the list of subjects:
  - the add button is in top of a subject's "more" button (so you can't press it)
* Dashboard
  - date "Mon 12 Nov" overflows in date filter (although text is wrapping)

## New Features
* Times in work-player view
* Option to export data to file
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
* Dashboard:
  - select all should look different than the other checkboxes?
  - summary boxes should have fixed size
  - summary times should be displayed bigger

## Develop
* Type-checking with flow
* Dictionary for strings
* Dictionary for colors (?)

## Refactors
* Make `DashboardSection` Component, that displays title and borders. Reuse styles
