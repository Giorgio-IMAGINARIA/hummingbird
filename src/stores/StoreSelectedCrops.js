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
    this.yeld = this.precisionRound(this.calculateYeld(), 2);
    console.log('this.yeld: ', this.yeld);
    this.emitChange();
  }

  calculateYeld() {
    let summedYeld = 0;
    let yeldArray = []
    this.selectedCrops.forEach(field => {
      yeldArray.push(this.calculateSingleField(field));
    });
    return this.calculateSumArray(yeldArray);
  }

  calculateSingleField(field) {
    return this.processValues(this.getFieldValues(field.fieldName), this.getAverageCropsValues(field.appliedCrops));
  }

  processValues(fieldValues, averageValues) {
    return (averageValues.averageCropsExpectedYeld * fieldValues.hectares * averageValues.averageCropsPricePerTonne) / (averageValues.averageCropsDiseaseRiskFactor * fieldValues.disease_susceptibility)
  }

  getFieldValues(fieldName) {
    let fieldValues;
    StoreFarm.getFarm().fields.forEach(field => {
      if (fieldName === field.name) {
        fieldValues = {
          hectares: field.hectares,
          disease_susceptibility: field.disease_susceptibility
        };
      };
    });
    return fieldValues
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

  precisionRound(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  calculateAverageArray(arr) {
    return this.calculateSumArray(arr) / arr.length;
  }
  calculateSumArray(arr) {
    return arr.reduce((a, b) => a + b, 0);
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
