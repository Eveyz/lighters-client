import axios from 'axios';
import { GET_TEACHER, GET_TEACHER_FAILURE } from './constants';
import { setCurrentIdentityData } from './users_actions';

export const getTeacher = (id) => {
  return (dispatch) => {
    axios.get(`/teachers/${id}`)
      .then(function(response){
        dispatch(setCurrentIdentityData(response.data));
      })
      .catch(function(err){
        dispatch({type: GET_TEACHER_FAILURE, payload: err})
      })
  }
};