import axios from 'axios';
import history from '../history';
import { GET_COURSES, GET_COURSE_FAILURE, ADD_COURSE, ADD_COURSE_FAILURE, UPDATE_COURSE, UPDATE_COURSE_FAILURE, DELETE_COURSE, DELETE_COURSE_FAILURE, COURSE_ADD_STUDENT, COURSE_ADD_STUDENT_FAILURE, DELETE_STUDENT, SELECT_COURSE, COURSE_DELETE_STUDENT, SWITCH_MODE, COURSE_POST_STUDENT } from './constants';
import { fetchFromArr } from '../ultis';
// import setAuthToken from '../helper/setAuthToken';

export const getCourses = () => {
  return function(dispatch){
    axios.get("/courses")
      .then(function(response) {
        dispatch({type: GET_COURSES, payload: response.data})
      })
      .catch(function(err){
        dispatch({type: GET_COURSE_FAILURE, payload: err})
        history.push('/');
      })
  }
};

export const addCourse = (course) => {
  return function(dispatch) {
    axios.post("/courses", course)
      .then(function(response){
        dispatch({type: ADD_COURSE, payload: response.data})
        history.push("/courses");
      })
      .catch(function(err){
        dispatch({type: ADD_COURSE_FAILURE, payload: "there was an error while posting a new course"})
      })
  }
};

export const updateCourse = (course) => {
  return function(dispatch) {
    axios.put("/courses/" + course.id)
      .then(function(response){
        dispatch({type: UPDATE_COURSE, payload: course})
      })
      .catch(function(err){
        dispatch({type: UPDATE_COURSE_FAILURE, payload: err})
      })
  }
};

export const deleteCourse = id => {
  return (dispatch) => {
    return axios.delete("/courses/" + id)
      .then(response => {
        dispatch({type: DELETE_COURSE, payload: id})
        // history.push("/courses");
      })
      .catch(err => {
        if(err) throw(err);
      })
  }
};

export const selectCourse = (course) => {
  return (dispatch) => {
    dispatch({type: SELECT_COURSE, payload: course});
  }
}

export const addStudent = (course) => {
  return (dispatch) => {
    dispatch(selectCourse(course));
    history.push(`/courses/${course._id}/add_student`);
  }
};

export const postStudent = (courseID, studentID) => {
  return dispatch => {
    return axios.post(`/courses/${courseID}/post_student`, studentID)
      .then(response => {
        dispatch({type: COURSE_POST_STUDENT, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
}

export const deleteStudent = (id, student) => {
  return dispatch => {
    return axios.delete(`/course/${id}/deleteStudent`)
      .then(response => {
        dispatch({type: COURSE_DELETE_STUDENT, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
};

export const switchMode = (mode) => {
  return dispatch => {
    dispatch({type: SWITCH_MODE, payload: mode})
  }
}