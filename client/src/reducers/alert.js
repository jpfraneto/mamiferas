//This is the reducer function for the alert action, it returns the next state of the app. It is a function that takes in a piece of state and an action

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = []; //For the first iteration.

//This function is a reducer, because it accepts a state and an action and returns a new state from them.
export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Depending on the type we need to decide what state we return.
    case SET_ALERT:
      //Adds what came in with the payload to the current state of the app.
      return [...state, payload];
    case REMOVE_ALERT:
      //removes the alert that is present in the state
      return state.filter(alert => alert.id !== payload);
    default:
      // Every reducer has a default state which just returns the state.
      return state;
  }
}
