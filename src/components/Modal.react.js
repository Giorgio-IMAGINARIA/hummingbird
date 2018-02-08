// React
import React, {Component} from 'react';
// Stores
import StoreModal from '../stores/StoreModal';
import StoreCrops from '../stores/StoreCrops';
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

  handleOpen(name) {
    console.log('StoreCrops: ', StoreCrops.getCrops());
    let checkboxes = [];
    checkboxes = StoreCrops.getCrops().map((item, index) => <Checkbox key={index} label={item.name} style={ModalStyle.checkbox}/>);
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
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
      <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.handleClose}/>
    ];
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
