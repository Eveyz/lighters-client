import axios from 'axios';
import setAuthToken from '../helper/setAuthToken';
import jwtDecode from 'jwt-decode';
import history from '../history';
import { SET_CURRENT_USER, SET_ADMIN, SET_STUDENT, SET_TEACHER, LOGIN_USER, SIGNUP_USER, USER_FROM_TOKEN_SUCCESS, USER_FROM_TOKEN_FAILURE, RESET_TOKEN, GET_COURSES, GET_BOOKS, GET_TEACHERS, GET_STUDENTS, ADMIN_INIT_FAILURE, SET_LOADING_STATUS } from './constants';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export const setAdmin = () => {
  return {
    type: SET_ADMIN,
    payload: "ADMIN"
  }
};

export const setTeacher = () => {
  return {
    type: SET_TEACHER,
    payload: "TEACHER"
  }
};

export const setStudent = () => {
  return {
    type: SET_STUDENT,
    payload: "STUDENT"
  }
};

export const userFromTokenSuccess = (currentUser) => {
  return {
    type: USER_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export const userFromTokenFailure = (error) => {
  return {
    type: USER_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function resetToken() {
  //used for logout
  return {
    type: RESET_TOKEN
  };
}

export const login = (user) => {
  return function(dispatch){
    axios.post("/users/authenticate", user)
      .then(function(response) {
        // response.data should be able to return the token we get from the api and we store the token
        const token = response.data.token;
        try {
          localStorage.setItem('jwtToken', token);
        } catch(err) {
          throw(err);
        }
        setAuthToken(token);
        let userToken = jwtDecode(token);
        dispatch(setCurrentUser(userToken));
        dispatch({type: LOGIN_USER, payload: response.data});

        // redirect to own page
        if(userToken.userTokenData.identity === "admin") {
          history.push('/users/admin/dashboard');
        } else if(userToken.userTokenData.identity === "teacher") {
          history.push('/teachers/me');
        } else {
          history.push('/students/me');
        }
      })
      .catch(function(err){
        dispatch({type: "LOGIN_USER_FAILLED", payload: err});
      })
  }
};

export const signup = (user) => {
	return function(dispatch){
    axios.post("/users/", user)
      .then(function(response) {
        // response.data should be able to return the token we get from the api and we store the token
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        dispatch({type: SIGNUP_USER, payload: response.data});
        history.push('/');
      })
      .catch(function(err){
        dispatch({type: "SIGNUP_USER_FAILLED", payload: err});
      })
  }
};

export const userFromToken = (token) => {
  //check if the token is still valid, if so, get me from the server
  return function(dispatch){
    setAuthToken(token);
    axios.get("/users/from/token", token)
      .then(function(response) {
        // response.data should be able to return the token we get from the api and we store the token
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        let userToken = jwtDecode(token);
        dispatch(setCurrentUser(userToken));
        dispatch({type: USER_FROM_TOKEN_SUCCESS, payload: response.data})

        if(userToken.userTokenData.identity === "admin") {
          dispatch(adminInit(token));
        }
      })
      .catch(function(err){
        // const status = err.response.status;
        // 401 unauthorized
        dispatch({type: USER_FROM_TOKEN_FAILURE, payload: err})
        history.push('/login');
      })
  }
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    localStorage.removeItem('state');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
  }
};

export const adminInit = (token) => {
	return function(dispatch){
    setAuthToken(token);
    axios.get("/users/admin/init", token)
      .then(function(response) {
        dispatch({type: GET_BOOKS, payload: response.data.books});
        dispatch({type: GET_COURSES, payload: response.data.courses});
        dispatch({type: GET_TEACHERS, payload: response.data.teachers});
        dispatch({type: GET_STUDENTS, payload: response.data.students});
        dispatch({type: SET_LOADING_STATUS, payload: false});
      })
      .catch(function(err){
        dispatch({type: ADMIN_INIT_FAILURE, payload: err});
      })
  }
};