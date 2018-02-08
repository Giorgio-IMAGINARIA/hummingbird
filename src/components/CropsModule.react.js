// React
import React, {Component} from 'react';
// Stores
import StoreCrops from '../stores/StoreCrops';
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
import crops from '../data/crops.json';

class CropsModule extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreCropsChange = this.onCurrentStoreCropsChange.bind(this);
    this.createCropsTable = this.createCropsTable.bind(this);
    this.state = {
      cropsArray: []
    };

  }

  onCurrentStoreCropsChange() {
    this.createCropsTable(StoreCrops.getCrops())
  }

  createCropsTable(nextArray) {
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
    this.createCropsTable([]);
  }

  render() {
    return (<div>
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

  componentDidMount() {
    StoreCrops.addChangeListener(this.onCurrentStoreCropsChange);
  }

  componentWillUnmount() {
    StoreCrops.removeChangeListener(this.onCurrentStoreCropsChange);
  }
}

export default CropsModule;
