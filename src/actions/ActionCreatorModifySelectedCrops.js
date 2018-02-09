// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

interface CropsToChangeObject {
  field: string,
  cropToChange: string
}

export default function(cropToChange : CropsToChangeObject) {
  dispatchAction(cropToChange);
}

function dispatchAction(parameter) {
  let Action = {
    type: 'update_selected_Crops',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
