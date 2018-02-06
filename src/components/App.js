// React
import React, {Component} from 'react';
// Leaflet
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
//React Modules
import MainBarUI from './MainBarUI.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

import farm from '../data/farm.json';
import crops from '../data/crops.json';

class App extends Component {
  render() {
    return (<div style={AppRootStyle.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
          <Tabs>
            <Tab icon={<FontIcon className = "material-icons" > phone</FontIcon>} label="RECENTS"/>
            <Tab icon={<FontIcon className = "material-icons" > favorite</FontIcon>} label="FAVORITES"/>
            <Tab icon={<MapsPersonPin />} label="NEARBY"/>
          </Tabs>
          <header>
            <h1>Welcome to th Hummingbird starter app</h1>
          </header>
          <p>
            To get started, edit
            <code>src/App.js</code>
            and save to reload. This is just a starter App, change it, remove things and add things however you want.
          </p>
          <Map style={{
              width: '500px',
              height: '500px'
            }} center={farm.centre.coordinates} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {farm.fields.map(field => <GeoJSON key={field.name} data={field.boundary}/>)}
          </Map>
          <ul>
            {crops.map(crop => <li key={crop.name}>{crop.name}</li>)}
          </ul>
        </div>
      </MuiThemeProvider>
    </div>);
  }
}

export default App;
