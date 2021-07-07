//This is the alert action, an object describing what happened and that is dispatched to
// the store where the global state is stored.

import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//This is an action called setAlert
export const setAlert =
  (msg, alertType, timeout = 2222) =>
  dispatch => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
