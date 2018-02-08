// React
import React, {Component} from 'react';
// Stores
import StoreYeld from '../stores/StoreYeld';
// Style Modules
import AnalyticsStyle from '../styles/AnalyticsStyle';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreYeldChange = this.onCurrentStoreYeldChange.bind(this);
    this.state = {
      yeldValue: 0
    };
  }

  onCurrentStoreYeldChange() {
    this.setState({yeldValue: StoreYeld.getYeld()});
  }

  render() {
    return (<div style={AnalyticsStyle.mainWrap}>
      <p style={AnalyticsStyle.topText}>
        Yeld
      </p>
      <p style={AnalyticsStyle.bottomText}>
        {this.state.yeldValue}
      </p>
    </div>);
  }

  componentDidMount() {
    StoreYeld.addChangeListener(this.onCurrentStoreYeldChange);
  }

  componentWillUnmount() {
    StoreYeld.removeChangeListener(this.onCurrentStoreYeldChange);
  }
}

export default Analytics;
