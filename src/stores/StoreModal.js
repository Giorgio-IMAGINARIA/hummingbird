import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreModal extends EventEmitter {

  constructor() {
    super();
    this.name = '';
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getName() {
    return this.name;
  }

  setName(parameter) {
    this.name = parameter.modalName;
  }

  handleAction(Action) {
    if (Action.type === 'open_modal') {
      this.setName(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreModal();
