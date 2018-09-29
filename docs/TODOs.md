# TODOs


## New Features
* Option to enable/disable ongoing notification
* Button to go from subjects-list directly to work-player
  - what happens if something is already playing?
* View with sprints (for each work session)
* Widgets in Android
* Search bar in subjects
* Add categories and tags
* Add support for nesting subjects
* Archive/unarchive subjects

## Style
* Style for `emptyComponent`s in `FlatList`s (no subjects and no sessions)
* Use a lighter color as division for items in lists
* Add some padding for items in subjects-list

## Develop
* Type-checking with flow
* Dictionary for strings
* Dictionary for colors (?)

## Fixes
* Review: Migrate from moment to date-fns, for better performance. Also, moment mutates objects
* Rename 'date' to 'dateString' in WorkSession attributes, and change format from 'L' to 'YYYY-MM-DD'. You need to add a reducer to remember the store version saved in every app, and an upgrade handler (to update the store when needed)
