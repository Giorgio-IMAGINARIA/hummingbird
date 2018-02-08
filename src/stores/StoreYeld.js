import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreYeld extends EventEmitter {

  constructor() {
    super();
    this.yeld = 0;
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getYeld() {
    return this.yeld;
  }

  setYeld(parameter) {
    this.yeld = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_yeld') {
      this.setYeld(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreYeld();
