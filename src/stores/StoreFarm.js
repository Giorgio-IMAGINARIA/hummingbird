// @flow
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreFarm extends EventEmitter {

  constructor() {
    super();
    this.farm = {};
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getFarm() {
    return this.farm;
  }

  setFarm(parameter) {
    this.farm = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_farm') {
      this.setFarm(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreFarm();
