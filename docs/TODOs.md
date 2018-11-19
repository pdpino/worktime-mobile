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
* In work-player, show the last 5 (or so) sessions worked on
* View with sprints (for each work session)
* Archive/unarchive subjects
* Dashboard
  - "This semester" shortcut
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
* `WorkPlayerComponent`, could be separated in: (1) selecting a subject (2) displaying and controlling. Currently, the ref and nesting is messy (see how the picker is being passed down to the component from the container)
