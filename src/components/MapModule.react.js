// React
import React, {Component} from 'react';
//Action Creators
import ActionCreatorQueryAPI from '../actions/ActionCreatorQueryAPI';
// Leaflet
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Data
import farm from '../data/farm.json';
//Stores

class MapModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapDimensions: {
        width: '100%',
        height: '500px'
      }
    };
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
      <Map style={this.state.mapDimensions} center={farm.centre.coordinates} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {farm.fields.map(field => <GeoJSON key={field.name} data={field.boundary}/>)}
      </Map>
    </div>);
  }

  componentDidMount() {
    ActionCreatorQueryAPI({query: 'farm'});
    this.changeMapDimensions(this.state.mapDimensions);
    window.addEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
  }

}

export default MapModule;
