// React
import React, {Component} from 'react';
// Data
import farm from '../data/farm.json';

class FieldsModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };

  }

  render() {
    return (<div>
      <ul>
        {farm.fields.map(field => <li key={field.name}>{field.name}</li>)}
      </ul>
    </div>);
  }
}

export default FieldsModule;
