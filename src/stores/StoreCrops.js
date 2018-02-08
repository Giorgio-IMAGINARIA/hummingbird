import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreCrops extends EventEmitter {

  constructor() {
    super();
    this.crops = {};
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getCrops() {
    return this.crops;
  }

  setCrops(parameter) {
    this.crops = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_crops') {
      this.setCrops(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreCrops();
