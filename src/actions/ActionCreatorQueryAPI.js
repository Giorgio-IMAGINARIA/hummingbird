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
  let route: string = `${StoreAddress.getAddressRoot()}${queryToSubmit.query}`;
  console.log('route: ', route);
  fetch(route, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((objectRetrieved) => {
    dispatchAction(objectRetrieved, queryToSubmit.query);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter, query) {
  let Action: ActionObject = {
    type: `update_${query}`,
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
