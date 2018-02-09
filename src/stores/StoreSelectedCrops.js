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
    console.log('parameter: ', parameter);
    console.log('this.selectedCrops: ', this.selectedCrops);
    let foundIndex = this.selectedCrops.findIndex((item, index) => item.fieldName === parameter.field);
    console.log('mensolina');
    if (foundIndex > -1) {
      let innerFoundIndex = this.selectedCrops[foundIndex].appliedCrops.findIndex((item, index) => item === parameter.cropToChange);
      innerFoundIndex > -1
        ? this.selectedCrops[foundIndex].appliedCrops.splice(innerFoundIndex, 1)
        : this.selectedCrops[foundIndex].appliedCrops.push(parameter.cropToChange);
    } else {
      let appliedCropsArray=[];
      appliedCropsArray.push(parameter.cropToChange);
      let newObject = {
        fieldName: parameter.field,
        appliedCrops: appliedCropsArray
      };
      this.selectedCrops.push(newObject);
    };
    this.emitChange();
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
