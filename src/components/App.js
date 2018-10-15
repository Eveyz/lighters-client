import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../css/App.css';
import Home from './layouts/Home';
import LoginForm from '../containers/users/LoginForm';
import SignupForm from '../containers/users/SignupForm';
import Dashboard from '../containers/users/admin/dashboard';
import BookList from '../containers/books/BookList';
import CourseList from '../containers/courses/CourseList';
import AddCourse from '../containers/courses/AddCourse';
import AddStudent from '../containers/courses/AddStudent';
import StudentList from '../containers/students/StudentList';
import TeacherList from '../containers/teachers/TeacherList';

class App extends Component {
  
  componentWillMount() {
    // this.props.loadUserFromToken();
  }
  
  componentWillReceiveProps(nextProps){
  }

  render() {
    return(
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/admin/dashboard" component={Dashboard} />
        <Route exact path="/courses" component={CourseList} />
        <Route exact path="/courses/add_course" component={AddCourse} />
        <Route exact path="/courses/:_id/add_student" component={AddStudent} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/teachers" component={TeacherList} />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/teachers/me" component={BookList} />
        <Route exact path="/students/me" component={BookList} />
      </div>
    );
  }
}

export default App;
