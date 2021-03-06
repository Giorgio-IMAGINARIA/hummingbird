// React
import React, {Component} from 'react';
// Stores
import StoreFarm from '../stores/StoreFarm';
//Action Creators
import ActionCreatorOpenModal from '../actions/ActionCreatorOpenModal';
// MaterialUI
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
// Style Modules
import FieldsModuleStyle from '../styles/FieldsModuleStyle';

class FieldsModule extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreFarmChange = this.onCurrentStoreFarmChange.bind(this);
    this.createFieldTable = this.createFieldTable.bind(this);
    this.state = {
      fieldsArray: []
    };

  }

  onCurrentStoreFarmChange() {
    this.createFieldTable(StoreFarm.getFarm().fields)
  }
  selectRow(name) {
    ActionCreatorOpenModal({modalName: name});
  }

  createFieldTable(nextArray) {
    let fieldList: Array<any> = [];
    fieldList= nextArray.map((item, index)=>
    <TableRow onMouseDown={this.selectRow.bind(this, item.name)} style={FieldsModuleStyle.tableRowColumnStyle} key={index}>
      <TableRowColumn>{item.name}</TableRowColumn>
      <TableRowColumn>{item.hectares}</TableRowColumn>
      <TableRowColumn>{item.disease_susceptibility}</TableRowColumn>
    </TableRow> );
    this.setState({fieldsArray: fieldList});
  }

  componentWillMount() {
    this.createFieldTable([]);
  }

  render() {
    return (<div>
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>ha</TableHeaderColumn>
            <TableHeaderColumn>Ds</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.state.fieldsArray}
        </TableBody>
      </Table>
    </div>);
  }

  componentDidMount() {
    StoreFarm.addChangeListener(this.onCurrentStoreFarmChange);
  }

  componentWillUnmount() {
    StoreFarm.removeChangeListener(this.onCurrentStoreFarmChange);
  }

}

export default FieldsModule;
