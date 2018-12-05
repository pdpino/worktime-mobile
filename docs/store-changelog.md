# Store changelog
All relevant changes to the store will be documented here.
A relevant change is one that requires an action to update the store saved in production

## 1 - with version 1.3.0
* Add reducer `app`, that keeps `storeVersion` (number) with the current store version
* Add attribute `device` to each `WorkSession`, with value `"mobile"`


## 0 - with version 0.0.1
* 2 reducers: `entities`, `work`

### Work
* Keeps:
  - `lastRunningSessionId` (this attribute was added later, but didn't need an action to update the store)
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
    The attributes `timeTotal`, `timeEffective` and `nPauses` are redundant, considering the info is stored in the sprints. Is kept for efficiency, so you don't have to recalculate with the sprints every time
  - Sprint:
    + `id`: number
    + `order`: number
    + `status`: string, one of "playing", "paused", "stopped"
    + `duration`: seconds
    + `workSession`: FK to WorkSession
