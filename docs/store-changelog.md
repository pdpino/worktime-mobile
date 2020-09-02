# Store changelog
All relevant changes to the store will be documented here.
A relevant change is one that requires an action to update the store saved in
production.
Irrelevant changes may also be documented, but only a relevant change triggers
a new store version.

## 5 - with version 1.15.0
* In `WorkSession`:
  * Add `tzName` attribute, and use that instead of `tzOffset`.
  * `tzOffset` is kept


## 4 - with version 1.10.0
* In `WorkSession`:
  - Add `tzOffset` attribute
  - Delete `date` attribute, use `timestampStart` and `tzOffset` instead.


## 3 - with version 1.7.0
* Add `Category` model, with attributes: `name`, `alias`, `description`.
  - Add foreign key from `Subject` to `Category` (N-1)


## 2 - with version 1.6.0
* Add `archived` to Subject model. By default, the subjects are not archived.


## Irrelevant change - with version 1.3.0
* Add reducer `profile`, that keeps:
  - `deviceName`: a string with the device's name, defaulting to `"mobile"`
  This change does not require a store update in production.


## 1 - with version 1.3.0-alpha
* Add reducer `app`, that keeps `storeVersion` (number) with the current store
  version.
* Add attribute `device` to each `WorkSession`, with value `"mobile"`


## 0 - with version 0.0.1
* 2 reducers: `entities`, `work`

### Work
* Keeps:
  - `lastRunningSessionId` (this attribute was added later, but does not require
    an action to update in production).
  - `runningSessionId`
  - `selectedSubjectId`

### Entities
* 3 models created: Subject, WorkSession and Sprint
  - Subject:
    + `id`: number
    + `name`: string
    + `description`: string
  - WorkSession:
    + `id`: number
    + `date`: string in format 2018/07/15 ('L' format in moment)
    + `timestampStart`: number, unix timestamp
    + `timestampEnd`: number, unix timestamp
    + `timeTotal`: number, seconds
    + `timeEffective`: number, seconds
    + `nPauses`: number
    + `status`: string, one of "playing", "paused", "stopped"
    + `subject`: FK to Subject
    The attributes `timeTotal`, `timeEffective` and `nPauses` are redundant,
    considering the info is stored in the sprints. Is kept for efficiency,
    so a recalculation is not needed every time.
  - Sprint:
    + `id`: number
    + `order`: number
    + `status`: string, one of "playing", "paused", "stopped"
    + `duration`: seconds
    + `workSession`: FK to WorkSession
