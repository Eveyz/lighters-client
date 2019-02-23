import axios from 'axios';
import history from '../history';
import { ADMIN_CREATE_TEACHER, ADMIN_CREATE_STUDENT } from './constants';

export const createTeacher = (teacher) => {
  return (dispatch) => {
    const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      temporaryPassword: randomstring,
      password: randomstring,
      passwordCon: randomstring,
      teacher: teacher
    }
    axios.post(`/admin/createTeacher`, data)
      .then((response) => {
        console.log(randomstring);
        dispatch({type: ADMIN_CREATE_TEACHER, payload: randomstring});
        history.push(`/teachers`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const updateTeacher = (teacher) => {
  
};

export const createStudent = (student) => {
  return (dispatch) => {
    const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      temporaryPassword: randomstring,
      password: randomstring,
      passwordCon: randomstring,
      student: student
    }
    axios.post(`/admin/createStudent`, data)
      .then((response) => {
        console.log(randomstring);
        dispatch({type: ADMIN_CREATE_STUDENT, payload: randomstring});
        history.push(`/students`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const updateStudent = (student) => {
  
};