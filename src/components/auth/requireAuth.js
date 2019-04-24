import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export const AdminRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return auth.isAuthenticated && auth.user.userTokenData.identity === "admin" 
    ? auth.user.exp >= (dateNow.getTime()/1000) 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const TeacherRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return auth.isAuthenticated && auth.user.userTokenData.identity === "teacher" 
    ? auth.user.exp >= (dateNow.getTime()/1000) 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const StudentRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return auth.isAuthenticated && auth.user.userTokenData.identity === "student" 
    ? auth.user.exp >= (dateNow.getTime()/1000) 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)