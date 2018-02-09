import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreSelectedCrops extends EventEmitter {

  constructor() {
    super();
    this.selectedCrops = [
      {
        fieldName: 'Big Field North',
        appliedCrops: ['Winter Wheat - Sundance', 'Winter Wheat - Dickens']
      }, {
        fieldName: 'House Rear',
        appliedCrops: ['Sprint Wheat - Granary', 'Winter Wheat - Reflectance']
      }
    ];
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getSelectedCrops() {
    return this.selectedCrops;
  }

  setSelectedCrops(parameter) {
    this.selectedCrops = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_selected_Crops') {
      this.setSelectedCrops(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreSelectedCrops();
