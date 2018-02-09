// React
import React, {Component} from 'react';
// Stores
import StoreSelectedCrops from '../stores/StoreSelectedCrops';
// Style Modules
import AnalyticsStyle from '../styles/AnalyticsStyle';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreSelectedCropsChange = this.onCurrentStoreSelectedCropsChange.bind(this);
    this.state = {
      yieldValue: 0
    };
  }

  onCurrentStoreSelectedCropsChange() {
    this.setState({yieldValue: StoreSelectedCrops.getYield()});
  }

  render() {
    return (<div style={AnalyticsStyle.mainWrap}>
      <p style={AnalyticsStyle.topText}>
        Yield
      </p>
      <p style={AnalyticsStyle.bottomText}>
        {this.state.yieldValue}
      </p>
    </div>);
  }

  componentDidMount() {
    StoreSelectedCrops.addChangeListener(this.onCurrentStoreSelectedCropsChange);
  }

  componentWillUnmount() {
    StoreSelectedCrops.removeChangeListener(this.onCurrentStoreSelectedCropsChange);
  }
}

export default Analytics;
