import axios from 'axios';
import history from '../history';
import { SELECT_CATEGORY, SELECT_SERIAL } from './constants';
    
export const selectCategory = (category) => {
  return (dispatch) => {
    dispatch({type: SELECT_CATEGORY, payload: category});
  }
}

export const selectSerial = (serialName) => {
  return dispatch => {
    dispatch({type: SELECT_SERIAL, payload: serialName})
  }
}