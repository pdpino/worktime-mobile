# TODOs
Next things to do

## Fixes
1. Dashboard subjects:
  - percentage from total time is outside of borders (to the right)

## New Features
* Times in work-player view
* Option to export data to file
* Press and hold stop button, to stop and discard the work-session (use a confirmation box)
* In work-player, show the last 5 (or so) sessions worked on
* View with sprints (for each work session)
* Archive/unarchive subjects
* Dashboard
  - save dates filter in store (also subjects selected?)
  - Add total time to the right of the bars

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
