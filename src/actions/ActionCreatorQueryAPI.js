// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface QueryObject {
  query: string
}

export default function(queryToSubmit : QueryObject): void {
  let route: string = `${StoreAddress.getAddressRoot()}${queryToSubmit.query}`;
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
  let Action = {
    type: `update_${query}`,
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
