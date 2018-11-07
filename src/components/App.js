import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../css/App.css';

// Components
import Home from './layouts/Home';
import CourseHierarchy from './mainpages/courseHierarchy';
import LoginForm from '../containers/users/LoginForm';
import SignupForm from '../containers/users/SignupForm';
import Dashboard from '../containers/users/admin/dashboard';
import BookList from '../containers/books/BookList';
import CourseList from '../containers/courses/CourseList';
import AddCourse from '../containers/courses/AddCourse';
import EditCourse from '../containers/courses/EditCourse';
import CourseAddStudent from '../containers/courses/AddStudent';
import CourseAddBook from '../containers/courses/AddBook';
import StudentList from '../containers/students/StudentList';
import NewStudent from '../containers/students/NewStudent';
import TeacherList from '../containers/teachers/TeacherList';
import NewTeacher from '../containers/teachers/NewTeacher';
import TeacherDashboard from '../containers/teachers/TeacherDashboard';
import TeacherCourseManager from '../containers/teachers/TeacherCourseManager';
import ReportFormContainer from '../containers/reports/ReportFormContainer';
import AllReports from '../containers/reports/AllReports';

class App extends Component {
  
  componentWillMount() {
    // this.props.loadUserFromToken();
    if(this.props.category !== "") this.props.selectCategory("", "ADMIN");
    if(this.props.review_category !== "") this.props.selectCategory("","REVIEW");
    if(this.props.new_category !== "") this.props.selectCategory("","NEW");
    if(this.props.future_category !== "") this.props.selectCategory("","FUTURE");
    
    if(this.props.auth.isAuthenticated) {
      if(this.props.auth.user.userTokenData.identity === "teacher") {
        let id = this.props.auth.identityData._id;
        // fetch data for current teacher if page refresh
        // this.props.getTeacher(id);
      }
    }
  }

  render() {
    return(
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/advantage" component={CourseHierarchy} />
        <Route exact path="/users/admin/dashboard" component={Dashboard} />
        <Route exact path="/courses" component={CourseList} />
        <Route exact path="/courses/add_course" component={AddCourse} />
        <Route exact path="/courses/:_id/edit_course" component={EditCourse} />
        <Route exact path="/courses/:_id/add_student" component={CourseAddStudent} />
        <Route exact path="/courses/:_id/add_book" component={CourseAddBook} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/students/new" component={NewStudent} />
        <Route exact path="/teachers" component={TeacherList} />
        <Route exact path="/teachers/new" component={NewTeacher} />
        <Route exact path="/teachers/:_id/dashboard" component={TeacherDashboard} />
        <Route exact path="/teachers/:_id/course_manager" component={TeacherCourseManager} />
        <Route exact path="/teachers/:_id/new_report" component={ReportFormContainer} />
        <Route exact path="/teachers/:_id/edit_report" component={ReportFormContainer} />
        <Route exact path="/teachers/:_id/reports" component={AllReports} />
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
