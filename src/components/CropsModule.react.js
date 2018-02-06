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
    this.createCropsTable = this.createCropsTable.bind(this);
    this.state = {
      cropsArray: []
    };

  }

  createCropsTable() {
    let nextArray: Array<any> = crops;
    let cropsList: Array<any> = [];
    nextArray.forEach((item, index) => {
      let elementToCreate: any = <TableRow key={index}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{item.expected_yield}</TableRowColumn>
        <TableRowColumn>{item.disease_risk_factor}</TableRowColumn>
        <TableRowColumn>{item.price_per_tonne}</TableRowColumn>
      </TableRow>;
      cropsList.push(elementToCreate);
    });
    this.setState({cropsArray: cropsList});
  }

  componentWillMount() {
    this.createCropsTable();
  }

  render() {
    return (<div>
      {/* {crops.map(crop => <li key={crop.name}>{crop.name}</li>)} */}
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Ey</TableHeaderColumn>
            <TableHeaderColumn>Drf</TableHeaderColumn>
            <TableHeaderColumn>£/t</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.state.cropsArray}
        </TableBody>
      </Table>
    </div>);
  }
}

export default CropsModule;
