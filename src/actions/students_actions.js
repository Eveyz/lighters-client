import axios from 'axios';
import history from '../history';

import { SELECT_STUDENT } from './constants';

export const selectStudent = (student, path) => {
  return (dispatch) => {
    dispatch({type: SELECT_STUDENT, payload: student});
    if(path) {
      history.push(path);
    }
  }
}