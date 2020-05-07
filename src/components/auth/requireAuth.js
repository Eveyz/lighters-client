import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, state, ...rest }) => (
  <Route {...rest} render={(props) => (
    state.auth === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export const AdminRoute = ({component: Component, state, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    console.log(state)
    return state.auth && state.current_user.identity === "admin" 
    ? state.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const TeacherRoute = ({component: Component, state, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return state.auth && state.current_user.identity === "teacher" 
    ? state.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const StudentRoute = ({component: Component, state, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return state.auth && state.current_user.identity === "student" 
    ? state.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)