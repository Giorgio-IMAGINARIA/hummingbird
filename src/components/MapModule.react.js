// React
import React, {Component} from 'react';
// Leaflet
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MapIcon from 'material-ui/svg-icons/maps/map';
import FieldIcon from 'material-ui/svg-icons/image/nature-people';
import CropIcon from 'material-ui/svg-icons/places/spa';
import SwipeableViews from 'react-swipeable-views';
//React Modules
import MainBarUI from './MainBarUI.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

import farm from '../data/farm.json';

class MapModule extends Component {

  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    // this.setMapDimensions = this.setMapDimensions.bind(this);
    this.state = {
      slideIndex: 0,
      mapDimensions: {
        width: '100%',
        height: '500px'
      }
    };

  }

  handleChangeTab(value) {
    this.setState({slideIndex: value});
  }

  // setMapDimensions() {
  //   let newHeight = window.innerHeight - 135;
  //   let nextDimensions = this.state.mapDimensions;
  //   nextDimensions.height = newHeight;
  //   this.setState({mapDimensions: nextDimensions});
  //   console.log("height: ", newHeight);
  // }
  changeMapDimensions(previousDimensions) {
    let newHeight = window.innerHeight - 135;
    let nextDimensions = {
      width: previousDimensions.width,
      height: previousDimensions.height
    };
    nextDimensions.height = newHeight;
    this.setState({mapDimensions: nextDimensions});
    console.log("height: ", newHeight);
  }

  render() {
    return (<div>
      <Map style={this.state.mapDimensions} center={farm.centre.coordinates} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {farm.fields.map(field => <GeoJSON key={field.name} data={field.boundary}/>)}
      </Map>
    </div>);
  }

  componentDidMount() {
    this.changeMapDimensions(this.state.mapDimensions);
    window.addEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeMapDimensions.bind(this, this.state.mapDimensions));
  }

}

export default MapModule;
