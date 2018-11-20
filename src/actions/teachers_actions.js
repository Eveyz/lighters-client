import axios from 'axios';
import history from '../history';
import { ADD_TEACHER, ADD_TEACHER_FAILURE, UPDATE_TEACHER, UPDATE_TEACHER_FAILURE, GET_TEACHER_FAILURE } from './constants';
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

export const addTeacher = (teacher) => {
  return (dispatch) => {
    var teacher_data = new FormData();
    
    // handle file here
    if(teacher['file']) {
      teacher_data.append('file', teacher['file']);
    }
    // handle data
    let teacher_json = JSON.stringify(teacher, null, 2);
    teacher_data.append('teacher', teacher_json);

    axios.post(`/teachers`, teacher_data)
      .then((response) => {
        dispatch({type: ADD_TEACHER, payload: response.data})
        history.push(`/teachers/${response.data}/dashboard`);
      })
      .catch((err) => {
        dispatch({type: ADD_TEACHER_FAILURE, payload: "there was an error while posting a new teacher"})
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