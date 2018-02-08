// React
import React from 'react';
//React Modules
import LoginBlockUI from './LoginBlockUI.react';
import Analytics from './Analytics.react';
// materialUI
import AppBar from 'material-ui/AppBar';
// Style Modules
import AppBarStyle from '../styles/AppBarStyle';

class MainBarUI extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar title="Hummingbird farm view" style={AppBarStyle.appBarStyle} iconElementLeft={<Analytics/>} iconElementRight={< LoginBlockUI />} iconStyleRight={AppBarStyle.rightIconStyle}>
      </AppBar>
    );
  }

}
export default MainBarUI;
