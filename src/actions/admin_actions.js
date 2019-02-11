import axios from 'axios';
import history from '../history';
import { ADMIN_CREATE_TEACHER, ADMIN_CREATE_STUDENT } from './constants';
import { addTeacher } from './teachers_actions';

export const createTeacher = (teacher) => {
  console.log("come to actions");
  return (dispatch) => {
    const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      email: `${randomstring}@lighters.com`,
      password: randomstring,
      passwordCon: randomstring,
      teacher: teacher
    }
    axios.post(`/admin/createTeacher`, data)
      .then((response) => {
        console.log(randomstring);
        dispatch({type: ADMIN_CREATE_TEACHER, payload: randomstring})
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const updateTeacher = (teacher) => {
  console.log("update actions");
  return (dispatch) => {
    const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      email: `${randomstring}@lighters.com`,
      password: randomstring,
      passwordCon: randomstring,
      teacher: teacher
    }
    axios.post(`/admin/createStudent`, data)
      .then((response) => {
        dispatch({type: ADMIN_CREATE_TEACHER, payload: randomstring})
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const createStudent = (student) => {

};