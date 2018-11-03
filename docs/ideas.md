# Ideas

## New Features
* Button to go from subjects-list directly to work-player
  - (review) what happens if something is already playing?
* Widgets in Android
* Option to enable/disable ongoing notification
* Search bar in subjects
* Add categories and tags
* Add support for nesting subjects
* Configure periodical notification time. E.g., if you've been working for an hour without pauses, it vibrates to remind you (useful for not working too much, or to remember to put stop)

## Refactors and fixes
* Refactor: (review) Migrate from moment to date-fns, for better performance. Also, moment mutates objects
* Refactor bar chart: encapsulate behavior. Receives an array of data to display, calculates the widths and display a `FlatList` with `HorizontalBar`s.
  - Consider adding options for displaying text on the right side and on top of the bars.
  - Leave by default the ticks on the left, so it should be called `SelectableHorizontalBarChart`
  - This should be reusable for others display of horiztonal-bars data. E.g., time by categories or tags (future)
* Rename 'date' to 'dateString' in WorkSession attributes, and change format from 'L' to 'YYYY-MM-DD'. You need to add a reducer to remember the store version saved in every app, and an upgrade handler (to update the store when needed) (talking about production)
* Dashboard fixes/bugs:
  - when bar is too small to show durations (e.g. 10min vs 8hrs of work in another subject). It should be calculated when the text is not showed?
  - what happens when you've worked for 0.005 seconds? (or a small amount of time). Should it be approximated? (It may not be important, as it is not a real case).
