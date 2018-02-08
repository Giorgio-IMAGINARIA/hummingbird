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
      mapDimensions: {
        width: '100%',
        height: '500px'
      },
      farm: {
        name: '',
        centre: {
          coordinates: [51.5074, 0.1278],
          type: "Point"
        },
        fields: []
      }
    };
  }

  onCurrentStoreFarmChange() {
    let nextFarm = StoreFarm.getFarm();
    nextFarm.centre.coordinates.reverse();
    this.setState({farm: nextFarm});
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
      <Map style={this.state.mapDimensions} center={this.state.farm.centre.coordinates} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {this.state.farm.fields.map(field => <GeoJSON key={field.name} data={field.boundary}/>)}
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
