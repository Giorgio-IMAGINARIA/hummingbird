// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

interface ModalNameObject {
  modalName: string
}

export default function(nameToSubmit : ModalNameObject): void {
  dispatchAction(nameToSubmit);
}

function dispatchAction(parameter) {
  let Action = {
    type: 'open_modal',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
