import { SELECT_CATEGORY, SELECT_SERIAL, RESET_SELECT_BOOKS } from './constants';

export const resetDeault = () => {
  return (dispatch) => {
    dispatch({type: RESET_SELECT_BOOKS, payload: ""});
  }
};

export const selectCategory = (category) => {
  return (dispatch) => {
    dispatch({type: SELECT_CATEGORY, payload: category});
  }
};

export const selectSerial = (serialName) => {
  return dispatch => {
    dispatch({type: SELECT_SERIAL, payload: serialName})
  }
};