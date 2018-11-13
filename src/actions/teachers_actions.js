import axios from 'axios';
import history from '../history';
import { UPDATE_TEACHER, UPDATE_TEACHER_FAILURE, GET_TEACHER_FAILURE } from './constants';
import { setCurrentIdentityData } from './users_actions';

export const getTeacher = (id) => {
  return (dispatch) => {
    axios.get(`/teachers/${id}`)
      .then((response) => {
        dispatch(setCurrentIdentityData(response.data));
      })
      .catch((err) => {
        dispatch({type: GET_TEACHER_FAILURE, payload: err})
      })
  }
};

export const updateTeacher = (id, field) => {
  return (dispatch) => {
    axios.put(`/teachers/${id}`, field)
      .then((response) => {
        dispatch({type: UPDATE_TEACHER, payload: response.data});
        history.push("/teachers");
      })
      .catch((err) => {
        dispatch({type: UPDATE_TEACHER_FAILURE, payload: {err: true}})
      })
  }
}