// React
import React, {Component} from 'react';
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
import MapModule from './MapModule.react';
import FieldsModule from './FieldsModule.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';
// Data
import crops from '../data/crops.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.state = {
      slideIndex: 0
    };

  }

  handleChangeTab(value) {
    this.setState({slideIndex: value});
  }

  render() {
    return (<div style={AppRootStyle.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
          <Tabs style={AppRootStyle.fixedTabsStyle} onChange={this.handleChangeTab} value={this.state.slideIndex}>
            <Tab icon={<MapIcon />} value={0} label="Map"/>
            <Tab icon={<FieldIcon />} value={1} label="Fields"/>
            <Tab icon={<CropIcon />} value={2} label="Crops"/>
          </Tabs>
          <SwipeableViews style={AppRootStyle.swipeableViewsStyle} index={this.state.slideIndex} onChangeIndex={this.handleChange}>

          <MapModule/>

          <FieldsModule/>


            <div>
              <ul>
                {crops.map(crop => <li key={crop.name}>{crop.name}</li>)}
              </ul>
            </div>


          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    </div>);
  }
}

export default App;
