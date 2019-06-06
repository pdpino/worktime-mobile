# Ideas

## New Features
* Button to go from subjects-list directly to work-player
  - (review) what happens if something is already playing?
  - (review) override this by improving the player view, simpler way of
  selecting, also display the nested subjects (and categories?)
* Widgets in Android
* Show start and end hour in the day (avg?, by day?, etc).
* Dashboard:
  - Button to close sections. Is this common in mobile?
* Work-player:
  - Show the last 5 (or so) sessions worked on. Could be displayed as a table.
  - More details about the current work-session (time since last pause, etc).
* Option to enable/disable ongoing notification.
* Search bar in subjects.
* Add tags.
* Configure periodical notification time. E.g., if you've been working for an
  hour without pauses, it vibrates to remind you (useful for not working too
  much, or to remember to put stop).
* Add a comment or evaluation at the end of each day/week, to evaluate good/bad
  work time habits.
  E.g., how tired are you? how satisfied with your work are u?
  Customizable questions?
* New Tab: Timeline
  - Shows subjects worked on the last day/week in a (vertical) timeline. Useful
    to see how was the work distribution today.
  - At the top (or bottom) the total time could be pinned.
  - Press a timespan for details?



## Charts in dashboard
* Times by subject in a time-span, comparing by subject (bar chart)
  (show effective vs total time).
* Distribution of work-sessions across dates (heatmap)
* Distribution of durations, (number of sessions or sprints (y axis) vs
  duration (x axis)).
* Distribution in days of the week (heatmap?, specific week?)


## Refactors and fixes
* Rename 'date' to 'dateString' in WorkSession attributes, and change format
  from 'L' to 'YYYY-MM-DD'. Store version needs to be upgraded.
  - Consider eliminating date, the timestampStart should be enough.
* [REVIEW] [REFACTOR] Migrate from moment to date-fns, for better performance.
  Also, moment mutates objects.
* [REFACTOR] Refactor bar chart: encapsulate behavior. Receives an array of
  data to display, calculates the widths and display a `FlatList` with
  `HorizontalBar`s.
  - Consider adding options for displaying text on the right side and on top of
    the bars.
  - Leave by default the ticks on the left, so it should be called
    `SelectableHorizontalBarChart`.
  - This should be reusable for others display of horiztonal-bars data. E.g.,
    time by categories or tags (future).
* [BUG] Dashboard fixes/bugs:
  - when bar is too small to show durations (e.g. 10min vs 8hrs of work in
    another subject). It should be calculated when the text is not showed?
  - what happens when you've worked for 0.005 seconds? (or a small amount of
    time). Should it be approximated? (It may not be important, as it is not a
    real case).
* [HACK] Fix subject/workSession update:
  - When updating a work-session, a call to `subject.update({ workSession })`
    is needed, to see the changes right away.
  - This creates a `workSession` attribute in each `subject`.
  - There should be a better way to do this (instead of calling
    `subject.update`). Calling `subject.refreshFromState()` each time a
    work-session changes (on play, pause or stop) does not work.
* [REFACTOR] Item selection hoc efficiency:
  - On each `updateSelection()` call, the navigation state is updated, which
  re-creates the actions list, which means that the `HeaderActions` component
  gets re-rendered (PureComponent is not a solution, since the actions list is
  a new object on each call).
  - The `ClickableIcon` component is a `PureComponent`, so is not that bad.
  - The actions could be memoized. Should the hoc handle it? the container?
