import history from '../history';
import axios from 'axios';
import { UPDATE_STUDENT, UPDATE_STUDENT_FAILURE, GET_STUDENT_FAILURE, SELECT_STUDENT } from './constants';
import { setCurrentIdentityData } from './users_actions';

export const getStudent = (id) => {
  return (dispatch) => {
    axios.get(`/students/${id}`)
      .then((response) => {
        dispatch(setCurrentIdentityData(response.data));
      })
      .catch((err) => {
        dispatch({type: GET_STUDENT_FAILURE, payload: err})
      })
  }
};

export const updateStudent = (id, field) => {
  return (dispatch) => {
    axios.put(`/students/${id}`, field)
      .then((response) => {
        dispatch({type: UPDATE_STUDENT, payload: response.data});
        history.push("/students");
      })
      .catch((err) => {
        dispatch({type: UPDATE_STUDENT_FAILURE, payload: {err: true}})
      })
  }
}

export const selectStudent = (student, path) => {
  return (dispatch) => {
    dispatch({type: SELECT_STUDENT, payload: student});
    if(path) {
      history.push(path);
    }
  }
}