import React from 'react';

import { Route, Redirect } from 'react-router-dom';

var dateNow = new Date();

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export const AdminRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => (
    (auth.isAuthenticated && auth.user.userTokenData.identity === "admin") ? <Component {...props} /> : auth.user.exp < (dateNow.getTime()/1000) ? <Redirect to='/login' /> : <Redirect to='/' />
  )} />
)

export const TeacherRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => (
    (auth.isAuthenticated && auth.user.userTokenData.identity === "teacher") ? <Component {...props} /> : auth.user.exp < (dateNow.getTime()/1000) ? <Redirect to='/login' /> : <Redirect to='/' />
  )} />
)

export const StudentRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => (
    (auth.isAuthenticated && auth.user.userTokenData.identity === "student") ? <Component {...props} /> : auth.user.exp < (dateNow.getTime()/1000) ? <Redirect to='/login' /> : <Redirect to='/' />
  )} />
)