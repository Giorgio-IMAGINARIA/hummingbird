// React
import React, {Component} from 'react';
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
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      fieldName: '',
      checkboxes: ''
    };
  }
  clickOnCheck(checkBoxLabel) {
    let checkboxes = [];
    let selectedCrops = StoreSelectedCrops.getSelectedCrops();
    checkboxes = StoreCrops.getCrops().map((item, index) => {
      let isChecked = false;
      selectedCrops.forEach((crops) => {
        if (this.state.fieldName === crops.fieldName) {
          isChecked = checkBoxLabel === item.name
            ? isChecked = !crops.appliedCrops.includes(checkBoxLabel)
            : isChecked = crops.appliedCrops.includes(item.name);
        };
      });
      return <Checkbox onCheck={this.clickOnCheck.bind(this, item.name)} checked={isChecked} key={index} label={item.name} style={ModalStyle.checkbox}/>
    });
    this.setState({checkboxes: checkboxes});
  }

  handleOpen(name) {
    let checkboxes = [];
    let selectedCrops = StoreSelectedCrops.getSelectedCrops();
    checkboxes = StoreCrops.getCrops().map((item, index) => {
      let isChecked = false;
      selectedCrops.forEach((crops) => {
        if (name === crops.fieldName) {
          isChecked = crops.appliedCrops.includes(item.name);
        };
      });
      return <Checkbox onCheck={this.clickOnCheck.bind(this, item.name)} checked={isChecked} key={index} label={item.name} style={ModalStyle.checkbox}/>
    });
    this.setState({open: true, fieldName: name, checkboxes: checkboxes});
  }

  handleClose() {
    this.setState({open: false});
  }

  onCurrentStoreModalChange() {
    console.log('open modal');
    this.handleOpen(StoreModal.getName());
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
  }

  componentWillUnmount() {
    StoreModal.removeChangeListener(this.onCurrentStoreModalChange);
  }
}

export default Modal;
