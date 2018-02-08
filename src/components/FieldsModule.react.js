// React
import React, {Component} from 'react';
// Stores
import StoreFarm from '../stores/StoreFarm';
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

class FieldsModule extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreFarmChange = this.onCurrentStoreFarmChange.bind(this);
    this.state = {
      farm: {
        name: '',
        centre: {
          coordinates: [51.5074, 0.1278],
          type: "Point"
        },
        fields: []
      }
    };
    this.createFieldTable = this.createFieldTable.bind(this);
    this.state = {
      fieldsArray: []
    };

  }

  onCurrentStoreFarmChange() {
    let nextFarm = StoreFarm.getFarm();
    nextFarm.centre.coordinates.reverse();
    this.setState({farm: nextFarm});
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
