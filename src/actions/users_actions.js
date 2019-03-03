import axios from 'axios';
import setAuthToken from '../helper/setAuthToken';
import jwtDecode from 'jwt-decode';
import history from '../history';
// import { groupBooks } from '../ultis';
import { SET_CURRENT_USER, SET_ADMIN, SET_STUDENT, SET_TEACHER, LOGIN_USER, SIGNUP_USER, USER_FROM_TOKEN_SUCCESS, USER_FROM_TOKEN_FAILURE, RESET_TOKEN, GET_COURSES_SIZE, GET_BOOKS_SIZE, GET_TEACHERS_SIZE, GET_STUDENTS_SIZE, GET_PAYCHECKS_SIZE, ADMIN_INIT_FAILURE, SET_LOADING_STATUS, SET_CURRENT_IDENTITY_DATA, LOGIN_USER_FAILURE } from './constants';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export const setCurrentIdentityData = (identityData) => {
  return {
    type: SET_CURRENT_IDENTITY_DATA,
    identityData: identityData
  }
}

export const setAdmin = () => {
  return {
    type: SET_ADMIN,
    payload: "ADMIN"
  }
};

export const setTeacher = () => {
  return dispatch => {
    dispatch({type: SET_TEACHER, payload: "TEACHER"});
    history.push('/signup');
  }
};

export const setStudent = () => {
  return dispatch => {
    dispatch({type: SET_STUDENT, payload: "STUDENT"});
    history.push('/signup');
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
  return (dispatch) => {
    axios.post("/users/authenticate", user)
      .then((response) => {
        localStorage.clear()
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
          const teacher = response.data.teacher;
          if(userToken.userTokenData.status === "RESET_REQUIRED") {
            history.push(`/users/${userToken.userTokenData.id}/activate`);
          } else {
            if(teacher) {
              dispatch(setCurrentIdentityData(teacher));
              history.push(`/teachers/${teacher._id}/dashboard`);
            } else {
              // teacher profile not created, redirect to new teacher
              history.push(`/teachers/new`);
            }
          }
        } else {
          const student = response.data.student;
          if(userToken.userTokenData.status === "RESET_REQUIRED") {
            history.push(`/users/${userToken.userTokenData.id}/activate`);
          } else {
            if(student) {
              dispatch(setCurrentIdentityData(student));
              history.push(`/students/${student._id}/dashboard`);
            } else {
              // student profile not created, redirect to new student
              history.push(`/students/new`);
            }
          }
        }
      })
      .catch((err) => {
        window.Materialize.toast(`${err.response.data.msg}`, 3000, 'red');
        dispatch({type: LOGIN_USER_FAILURE, payload: err.response.data});
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
        let userToken = jwtDecode(token);
        dispatch(setCurrentUser(userToken));
        dispatch({type: SIGNUP_USER, payload: response.data});

        // redirect to own page
        if(userToken.userTokenData.identity === "teacher") {
          history.push('/teachers/new');
        } else if(userToken.userTokenData.identity === "student") {
          history.push('/students/new');
        } else {
          history.push('/');
        }
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
    localStorage.clear()
    dispatch(setCurrentUser({}));
    setAuthToken(false);
    history.push('/');
  }
};

export const sessionExpired = () => {
  return dispatch => {
    localStorage.clear()
    dispatch(setCurrentUser({}))
    setAuthToken(false)
    history.push('/login');
    window.Materialize.toast(`登录时效过期, 请重新登录`, 3000, 'red');
  }
};

export const activate = (user) => {
  return (dispatch) => {
    axios.post(`/users/${user.id}/activate`, user)
      .then((response) => {
        history.push('/login');
      })
      .catch((err) => {
        dispatch({type: LOGIN_USER_FAILURE, payload: err.response.data});
      })
  }
};

export const adminInit = (token) => {
	return function(dispatch){
    setAuthToken(token);
    axios.get("/users/admin/init", token)
      .then(function(response) {
        // dispatch({type: GET_BOOKS, payload: response.data.books});
        dispatch({type: GET_BOOKS_SIZE, payload: response.data.books});
        // dispatch({type: GROUPED_BOOKS, payload: groupBooks(response.data.books)});
        dispatch({type: GET_COURSES_SIZE, payload: response.data.courses});
        dispatch({type: GET_TEACHERS_SIZE, payload: response.data.teachers});
        dispatch({type: GET_STUDENTS_SIZE, payload: response.data.students});
        dispatch({type: GET_PAYCHECKS_SIZE, payload: response.data.paychecks});
        dispatch({type: SET_LOADING_STATUS, payload: false});
      })
      .catch(function(err){
        localStorage.clear()
        history.push('/login');
        dispatch(setCurrentUser({}));
        setAuthToken(false);
        dispatch({type: ADMIN_INIT_FAILURE, payload: err});
      })
  }
};