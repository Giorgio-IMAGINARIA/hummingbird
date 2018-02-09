import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreSelectedCrops extends EventEmitter {

  constructor() {
    super();
    this.yeld = 0;
    this.selectedCrops = [];
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

  getSelectedCrops() {
    return this.selectedCrops;
  }

  setSelectedCrops(parameter) {
    let foundIndex = this.selectedCrops.findIndex((item, index) => item.fieldName === parameter.field);
    if (foundIndex > -1) {
      let innerFoundIndex = this.selectedCrops[foundIndex].appliedCrops.findIndex((item, index) => item === parameter.cropToChange);
      innerFoundIndex > -1
        ? this.selectedCrops[foundIndex].appliedCrops.splice(innerFoundIndex, 1)
        : this.selectedCrops[foundIndex].appliedCrops.push(parameter.cropToChange);
    } else {
      let newObject = {
        fieldName: parameter.field,
        appliedCrops: [parameter.cropToChange]
      };
      this.selectedCrops.push(newObject);
    };
    this.calculateYeld();
    this.emitChange();
  }
  calculateYeld(){

  }

  handleAction(Action) {
    if (Action.type === 'update_selected_Crops') {
      this.setSelectedCrops(Action.parameter);
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreSelectedCrops();
