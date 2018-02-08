// React
import React, {Component} from 'react';
//Action Creators
import ActionCreatorQueryAPI from '../actions/ActionCreatorQueryAPI';
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
import CropsModule from './CropsModule.react';
import Modal from './Modal.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

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
            <CropsModule/>
          </SwipeableViews>
          <Modal/>
        </div>
      </MuiThemeProvider>
    </div>);
  }

  componentDidMount() {
    ActionCreatorQueryAPI({query: 'farm'});
    ActionCreatorQueryAPI({query: 'crops'});
  }
}

export default App;
