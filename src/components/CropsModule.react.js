// React
import React, {Component} from 'react';
// MaterialUI
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
// Data
import farm from '../data/farm.json';
// Data
import crops from '../data/crops.json';

class CropsModule extends Component {
  constructor(props) {
    super(props);
    this.createFieldTable = this.createFieldTable.bind(this);
    this.state = {
      fieldsArray: []
    };

  }

  createFieldTable() {
    let nextArray: Array<any> = farm.fields;
    let fieldList: Array<any> = [];
    nextArray.forEach((item, index) => {
      let elementToCreate: any = <TableRow key={index}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{item.hectares}</TableRowColumn>
        <TableRowColumn>{item.disease_susceptibility}</TableRowColumn>
      </TableRow>;
      fieldList.push(elementToCreate);
    });
    this.setState({fieldsArray: fieldList});
  }

  componentWillMount() {
    this.createFieldTable();
  }

  render() {
    return (<div>
      {/* {crops.map(crop => <li key={crop.name}>{crop.name}</li>)} */}
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
}

export default CropsModule;
