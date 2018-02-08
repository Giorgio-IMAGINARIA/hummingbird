// React
import React, {Component} from 'react';
// Stores
import StoreModal from '../stores/StoreModal';
// MaterialUI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreModalChange = this.onCurrentStoreModalChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      fieldName: ''
    };
  }

  handleOpen(name) {
    this.setState({open: true, fieldName: name});
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
      <Dialog title={this.state.fieldName} actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
        
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
