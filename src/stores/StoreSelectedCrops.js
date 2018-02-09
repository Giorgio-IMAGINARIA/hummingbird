import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
// Stores
import StoreFarm from './StoreFarm';
import StoreCrops from './StoreCrops';

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
    this.yeld = this.calculateYeld();
    this.emitChange();
  }

  calculateYeld() {
    let summedYeld = 0;
    this.selectedCrops.forEach(field => {
      summedYeld = summedYeld + this.calculateSingleField(field);
    });
    return summedYeld;
  }

  calculateSingleField(field) {
    let fields = StoreFarm.getFarm().fields;
    // console.log('fields: ', fields);
    // console.log('field: ', field);

    let averageValues = this.getAverageCropsValues(field.appliedCrops);
    this.getFieldValues(field.fieldName);
    // console.log('averageValues: ', averageValues);

    return 6;
  }

  getFieldValues(fieldName){
    console.log('fieldName: ', fieldName);
  }

  getAverageCropsValues(appliedCrops) {
    let cropsExpectedYeldArray = [];
    let cropsDiseaseRiskFactorArray = [];
    let cropsPricePerTonneArray = [];
    appliedCrops.forEach(appliedCrop => {
      StoreCrops.getCrops().forEach(cropDetail => {
        if (cropDetail.name === appliedCrop) {
          cropsExpectedYeldArray.push(cropDetail.expected_yield);
          cropsDiseaseRiskFactorArray.push(cropDetail.disease_risk_factor);
          cropsPricePerTonneArray.push(cropDetail.price_per_tonne);
        }
      })
    });
    return {averageCropsExpectedYeld: this.calculateAverageArray(cropsExpectedYeldArray), averageCropsDiseaseRiskFactor: this.calculateAverageArray(cropsDiseaseRiskFactorArray), averageCropsPricePerTonne: this.calculateAverageArray(cropsPricePerTonneArray)}
  }

  calculateAverageArray(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
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
