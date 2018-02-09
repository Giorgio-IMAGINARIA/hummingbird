To start the app:
1. Install yarn on your dev environment
2. Build the packages by typing "yarn"
3. Once done type "yarn start"
4. A browser page will be opened at http://localhost:3000/

# USAGE
1. Go to the Home page
2. Click the "Fields" tab
3. Click on one of the fields to open a dialog
4. Add or delete crops to see the yield changing

# EXPLANATION
The app is made of different components contained in the "components" directory. Some of these components call Action-Creators contained in the "actions" directory. The Action-Creators dispatch actions that are listed by Stores contained in the "stores" directory. The Stores are listened by some components that upon changes update their state. This pattern is called Flux and it's used for the data flow process of the application.

The app uses MaterialUI al UI library and particularly the "Tabs", "SwipeableViews" and Table components.

The MapModule component has listeners for the resizing of the leaflet map by dynamically changing its state.

The CropsModule and FieldsModule and show details regarding the data imported from the API through an Action-Creator and by using the Fetch library.

The FieldsModule has clickable rows, upon clicking one, the related details on the crops currently selected are shown in a dialog. The checkboxes provided allow the user to add or delete crops for the field and to change the overall yield value.

The states of the checkboxes are controlled through the ActionCreatorModifySelectedCrops and the StoreSelectedCrops. All the calculations related to the yield are made in the latter.

Relevant parts of the calculations are:

getAverageCropsValues(appliedCrops) {
  let cropsExpectedYieldArray = [];
  let cropsDiseaseRiskFactorArray = [];
  let cropsPricePerTonneArray = [];
  appliedCrops.forEach(appliedCrop => {
    let cropDetail = StoreCrops.getCrops().find(cropDetail => cropDetail.name === appliedCrop);
    cropsExpectedYieldArray.push(cropDetail.expected_yield);
    cropsDiseaseRiskFactorArray.push(cropDetail.disease_risk_factor);
    cropsPricePerTonneArray.push(cropDetail.price_per_tonne);
  });
  return {averageCropsExpectedYield: this.calculateAverageArray(cropsExpectedYieldArray), averageCropsDiseaseRiskFactor: this.calculateAverageArray(cropsDiseaseRiskFactorArray), averageCropsPricePerTonne: this.calculateAverageArray(cropsPricePerTonneArray)}
}

That returns an object containing the average values for the crops in a single field

processValues(fieldValues, averageValues) {
  let valueToReturn = averageValues.averageCropsDiseaseRiskFactor === 0 || fieldValues.disease_susceptibility === 0
    ? 0
    : (averageValues.averageCropsExpectedYield * fieldValues.hectares * averageValues.averageCropsPricePerTonne) / (averageValues.averageCropsDiseaseRiskFactor * fieldValues.disease_susceptibility);
  return valueToReturn;
}

that returns the yield for a single field. The whole logic is protected against dividing values for zero.

The final yield value is provided with a precision of two digits after the comma.

this.yield = this.precisionRound(this.calculateYield(), 2);

precisionRound(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

Every time crops are changed through the checkboxes, a new calculation occurs for the yield that is then represented in the Analytics component.

The state of the checkboxes is handled by the following function:

ModifyCheckboxState(fieldName) {
  let checkboxes = [];
  let selectedCrops = StoreSelectedCrops.getSelectedCrops();
  checkboxes = StoreCrops.getCrops().map((item, index) => {
    let isChecked;
    let foundCrops = selectedCrops.find(crops => fieldName === crops.fieldName);
    isChecked = foundCrops
      ? foundCrops.appliedCrops.includes(item.name)
      : false;
    return <Checkbox onCheck={this.clickOnCheck.bind(this, item.name)} checked={isChecked} key={index} label={item.name} style={ModalStyle.checkbox}/>
  });
  this.setState({checkboxes: checkboxes});
}

The function dynamically creates a list of Checkboxes. It's important to notice how the clickOnCheck function has the context bound to this and gets the parameter item.name related to each element created.

# FUTURE IMPROVEMENTS
Having had more time I would have developed a logic for selecting fields in the map and to then showing data related to that specific field in a dialog. Also It would have been interesting to double-click in one of the rows of the tables and to have a pop-up of the map centred on that specific field which would have been highlighted with a different colour.

# N.B.
I had to use "nextFarm.centre.coordinates.reverse();" to get the right coordinates for the map from the API, differently from the static data provided for testing.
