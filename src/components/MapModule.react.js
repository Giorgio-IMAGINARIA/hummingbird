// React
import React, {Component} from 'react';
//Action Creators
import ActionCreatorQueryAPI from '../actions/ActionCreatorQueryAPI';
// Stores
import StoreFarm from '../stores/StoreFarm';
// Leaflet
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Data
import farm from '../data/farm.json';
//Stores

class MapModule extends Component {

  constructor(props) {
    super(props);
    this.onCurrentStoreFarmChange = this.onCurrentStoreFarmChange.bind(this);
    this.state = {
      wholeMap:'',
      mapDimensions: {
        width: '100%',
        height: '500px'
      },
      farm:{
        name: '',
        centre:{
          coordinates:[51.5074,0.1278],
          type: "Point"
        },
        fields:[]
      }
    };
  }

  onCurrentStoreFarmChange() {
  let nextFarm = StoreFarm.getFarm();
console.log('nextFarm: ', nextFarm);
this.setState({farm: nextFarm});
console.log('this.state.farm.centre.coordinates: ', this.state.farm.centre.coordinates);

  // let droneList: Array<any> = [];
  // nextArray.forEach((item, index) => {
  //   let elementToCreate: any = <TableRow key={index}>
  //     <TableRowColumn>{item.droneId}</TableRowColumn>
  //     <TableRowColumn>{item.name}</TableRowColumn>
  //     <TableRowColumn>{item.numCrashes}</TableRowColumn>
  //     <TableRowColumn>{item.numFlights}</TableRowColumn>
  //     <TableRowColumn>{item.price}</TableRowColumn>
  //     <TableRowColumn>{item.currency}</TableRowColumn>
  //   </TableRow>;
  //   droneList.push(elementToCreate);
  // });
  // this.setState({droneArray: droneList});
}

  changeMapDimensions(previousDimensions) {
    let newHeight = window.innerHeight - 135;
    let nextDimensions = {
      width: previousDimensions.width,
      height: previousDimensions.height
    };
    nextDimensions.height = newHeight;
    this.setState({mapDimensions: nextDimensions});
  }

  render() {
    return (<div>
      {this.state.wholeMap}
      <Map style={this.state.mapDimensions} center={this.state.farm.centre.coordinates} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {this.state.farm.fields.map(field => <GeoJSON key={field.name} data={field.boundary}/>)}
      </Map>
    </div>);
  }

  componentDidMount() {
    ActionCreatorQueryAPI({query: 'farm'});
    this.changeMapDimensions(this.state.mapDimensions);
    window.addEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
    StoreFarm.addChangeListener(this.onCurrentStoreFarmChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
    StoreFarm.removeChangeListener(this.onCurrentStoreFarmChange);
  }

}

export default MapModule;
