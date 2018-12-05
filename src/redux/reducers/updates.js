// eslint-disable-next-line import/prefer-default-export
export function addAttrWorkSessionDevice(WorkSession) {
  WorkSession.all().update({ device: 'mobile' });
}
