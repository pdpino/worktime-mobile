import i18n from '../../shared/i18n';

class ActionsHandler {
  constructor(callbacks) {
    this.nameToCallbackMap = callbacks;
    this.names = Object.keys(callbacks);

    this.updateTranslations();
  }

  nameToLabel(name) {
    return this.nameToLabelMap[name];
  }

  labelToCallback(label) {
    const name = this.labelToNameMap[label];
    return name && this.nameToCallbackMap[name];
  }

  updateTranslations() {
    this.nameToLabelMap = {};
    this.labelToNameMap = {};

    this.names.forEach((name) => {
      const label = i18n.t(`notif.actions.${name}`);

      this.nameToLabelMap[name] = label;
      this.labelToNameMap[label] = name;
    });
  }
}

export default ActionsHandler;
