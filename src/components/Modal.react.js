// React
import React, {Component} from 'react';
//Action Creators
import ActionCreatorModifySelectedCrops from '../actions/ActionCreatorModifySelectedCrops';
// Stores
import StoreModal from '../stores/StoreModal';
import StoreCrops from '../stores/StoreCrops';
import StoreSelectedCrops from '../stores/StoreSelectedCrops';
// MaterialUI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
// Style Modules
import ModalStyle from '../styles/ModalStyle';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreModalChange = this.onCurrentStoreModalChange.bind(this);
    this.onCurrentStoreSelectedCropsChange = this.onCurrentStoreSelectedCropsChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      fieldName: '',
      checkboxes: ''
    };
  }

  handleClose() {
    this.setState({open: false});
  }

  onCurrentStoreModalChange() {
    this.handleOpen(StoreModal.getName());
  }

  handleOpen(name) {
    this.ModifyCheckboxState(name);
    this.setState({open: true, fieldName: name});
  }

  onCurrentStoreSelectedCropsChange() {
    this.ModifyCheckboxState(this.state.fieldName);
  }

  ModifyCheckboxState(fieldName) {
    let checkboxes = [];
    let selectedCrops = StoreSelectedCrops.getSelectedCrops();
    checkboxes = StoreCrops.getCrops().map((item, index) => {
      let isChecked = false;
      selectedCrops.forEach((crops) => {
        if (fieldName === crops.fieldName) {
          isChecked = crops.appliedCrops.includes(item.name);
        };
      });
      return <Checkbox onCheck={this.clickOnCheck.bind(this, item.name)} checked={isChecked} key={index} label={item.name} style={ModalStyle.checkbox}/>
    });
    this.setState({checkboxes: checkboxes});
  }

  clickOnCheck(checkBoxLabel) {
    ActionCreatorModifySelectedCrops({field: this.state.fieldName, cropToChange: checkBoxLabel});
  }

  render() {
    const actions = [<FlatButton keyboardFocused={true} label="Close" primary={true} onClick={this.handleClose}/>];
    return (<div>
      <RaisedButton label="Dialog" onClick={this.handleOpen}/>
      <Dialog autoScrollBodyContent={true} title={this.state.fieldName} actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
        {this.state.checkboxes}
      </Dialog>
    </div>);
  }

  componentDidMount() {
    StoreModal.addChangeListener(this.onCurrentStoreModalChange);
    StoreSelectedCrops.addChangeListener(this.onCurrentStoreSelectedCropsChange);
  }

  componentWillUnmount() {
    StoreModal.removeChangeListener(this.onCurrentStoreModalChange);
    StoreSelectedCrops.removeChangeListener(this.onCurrentStoreSelectedCropsChange);
  }
}

export default Modal;
