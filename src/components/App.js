import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../css/App.css';
import '../css/flash.css';
import '../css/richtext-editor.css';

import { AdminRoute, TeacherRoute, StudentRoute } from './auth/requireAuth';
// Components
import Home from './layouts/Home';
import CourseHierarchy from './mainpages/courseHierarchy';
import LoginForm from '../containers/users/LoginForm';
import SignupForm from '../containers/users/SignupForm';
import Dashboard from '../containers/users/admin/dashboard';
import BookList from '../containers/books/BookList';
import NewBook from '../components/books/NewBook';
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
import StudentDashboard from '../containers/students/StudentDashboard';
import AssetsDashboard from '../containers/assets/AssetsDashboard';

class App extends Component {
  
  componentWillMount() {
    // this.props.loadUserFromToken();
    if(this.props.category !== "") this.props.selectCategory("", "ADMIN");
    if(this.props.review_category !== "") this.props.selectCategory("","REVIEW");
    if(this.props.new_category !== "") this.props.selectCategory("","NEW");
    if(this.props.future_category !== "") this.props.selectCategory("","FUTURE");
    
    if(this.props.auth.isAuthenticated) {
      if(this.props.auth.user.userTokenData.identity === "teacher") {
        // let id = this.props.auth.identityData._id;
        // fetch data for current teacher if page refresh
        // this.props.getTeacher(id);
      } else if(this.props.auth.user.userTokenData.identity === "student") {
        let id = this.props.auth.identityData._id;
        // fetch data for current student if page refresh
        this.props.getStudent(id);
      }
    }
  }

  render() {
    return(
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/advantage" component={CourseHierarchy} />
        <AdminRoute exact path="/users/admin/dashboard" auth={this.props.auth} component={Dashboard} />
        <AdminRoute exact path="/courses" auth={this.props.auth} component={CourseList} />
        <AdminRoute exact path="/courses/add_course" auth={this.props.auth} component={AddCourse} />
        <AdminRoute exact path="/courses/:_id/edit_course" auth={this.props.auth} component={EditCourse} />
        <AdminRoute exact path="/courses/:_id/add_student" auth={this.props.auth} component={CourseAddStudent} />
        <AdminRoute exact path="/courses/:_id/add_book" auth={this.props.auth} component={CourseAddBook} />
        <AdminRoute exact path="/students" auth={this.props.auth} component={StudentList} />
        <AdminRoute exact path="/books" auth={this.props.auth} component={BookList} />
        <AdminRoute exact path="/books/new" auth={this.props.auth} component={NewBook} />
        <AdminRoute exact path="/assets" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/level_salaries" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/teacher_salaries" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/transactions" auth={this.props.auth} component={AssetsDashboard} />
        <StudentRoute exact path="/students/:_id/dashboard" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/courses" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/reports" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/books" auth={this.props.auth} component={StudentDashboard} />
        <Route exact path="/students/new" component={NewStudent} />
        <Route exact path="/teachers" component={TeacherList} />
        <Route exact path="/teachers/new" component={NewTeacher} />
        <TeacherRoute exact path="/teachers/:_id/dashboard" auth={this.props.auth} component={TeacherDashboard} />
        <TeacherRoute exact path="/teachers/:_id/course_manager" auth={this.props.auth} component={TeacherCourseManager} />
        <TeacherRoute exact path="/teachers/:_id/new_report" auth={this.props.auth} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/edit_report" auth={this.props.auth} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/reports" auth={this.props.auth} component={AllReports} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/teachers/me" component={BookList} />
        <Route exact path="/students/me" component={BookList} />
      </div>
    );
  }
}

export default App;
