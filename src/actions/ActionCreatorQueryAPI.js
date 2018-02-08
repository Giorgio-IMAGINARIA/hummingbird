// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: Array<any>
}

interface ActionErrorObject {
  type: string,
  parameter: string
}

interface QueryObject {
  query: string
}

export default function(queryToSubmit : QueryObject): void {

  console.log('queryToSubmit: ', queryToSubmit);
  let route: string = `${StoreAddress.getAddressRoot()}${queryToSubmit.query}`;
  console.log('route: ', route);
  fetch(route, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((objectRetrieved) => {
    dispatchAction(objectRetrieved);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter) {
  let Action: ActionObject = {
    type: 'update_farm_fields',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
