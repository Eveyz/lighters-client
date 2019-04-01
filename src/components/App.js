import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/App.css';
import '../css/flash.css';
import '../css/richtext-editor.css';

import { AdminRoute, TeacherRoute, StudentRoute, PrivateRoute } from './auth/requireAuth';
import { sessionExpired } from '../actions/users_actions'

// Components
import asyncComponent from '../components/AsyncComponent';

// const Home = asyncComponent(() => import('./layouts/Home'))
const Home = asyncComponent(() => import("./layouts/Home"));

// import Home from './layouts/Home';
const CourseHierarchy = asyncComponent(() => import('./mainpages/courseHierarchy'));
const  LoginForm = asyncComponent(() => import('../containers/users/LoginForm'));
const SignupForm = asyncComponent(() => import('../containers/users/SignupForm'));
const Dashboard = asyncComponent(() => import('../containers/users/admin/dashboard'));
const BookListContainer = asyncComponent(() => import('../containers/books/BookListContainer'));
const NewBook = asyncComponent(() => import('../components/books/NewBook'));
const EditBook = asyncComponent(() => import('../components/books/EditBook'));
const ViewBook = asyncComponent(() => import('../components/books/ViewBook'));
const CourseList = asyncComponent(() => import('../containers/courses/CourseList'));
const AddCourse = asyncComponent(() => import('../containers/courses/AddCourse'));
const EditCourse = asyncComponent(() => import('../containers/courses/EditCourse'));
const CourseAddStudent = asyncComponent(() => import('../containers/courses/AddStudent'));
const CourseAddBook = asyncComponent(() => import('../containers/courses/AddBook'));
const StudentList = asyncComponent(() => import('../containers/students/StudentList'));
const NewStudent = asyncComponent(() => import('../containers/students/NewStudent'));
const TeacherList = asyncComponent(() => import('../containers/teachers/TeacherList'));
const NewTeacher = asyncComponent(() => import('../containers/teachers/NewTeacher'));
const TeacherDashboard = asyncComponent(() => import('../containers/teachers/TeacherDashboard'));
const ShowTeacher = asyncComponent(() => import('../containers/teachers/ShowTeacher'));
const TeacherProfile = asyncComponent(() => import('../components/teachers/TeacherProfile'));
const TeacherCourseManager = asyncComponent(() => import('../containers/teachers/TeacherCourseManager'));
const ReportFormContainer = asyncComponent(() => import('../containers/reports/ReportFormContainer'));
const AllReports = asyncComponent(() => import('../containers/reports/AllReports'));
const ViewReport = asyncComponent(() => import('../containers/reports/ViewReport'));
const StudentDashboard = asyncComponent(() => import('../containers/students/StudentDashboard'));
const StudentProfile = asyncComponent(() => import('../components/students/StudentProfile'));
const ShowStudent = asyncComponent(() => import('../containers/students/ShowStudent'));
const AssetsDashboard = asyncComponent(() => import('../containers/assets/AssetsDashboard'));
const AdminTeacherNew = asyncComponent(() => import('../containers/users/admin/teachers/AdminTeacherNew'));
const AdminTeacherEdit = asyncComponent(() => import('../containers/users/admin/teachers/AdminTeacherEdit'));
const AdminStudentNew = asyncComponent(() => import('../containers/users/admin/students/AdminStudentNew'));
const AdminStudentEdit = asyncComponent(() => import('../containers/users/admin/students/AdminStudentEdit'));
const ActivateUser = asyncComponent(() => import('../containers/users/activate/ActivateUser'));

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
        this.props.getTeacher(id);
      } else if(this.props.auth.user.userTokenData.identity === "student") {
        let id = this.props.auth.identityData._id;
        // fetch data for current student if page refresh
        this.props.getStudent(id);
      }

      var dateNow = new Date();
      if(this.props.auth.user.exp < (dateNow.getTime()/1000)) {
        this.props.sessionExpired()
      }
    }
  }

  render() {
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/advantage" component={CourseHierarchy} />
        <Route exact path="/teachers/new" component={NewTeacher} />
        <Route exact path="/students/new" component={NewStudent} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/teachers/me" component={BookListContainer} />
        <Route exact path="/students/me" component={BookListContainer} />
        <PrivateRoute exact path="/users/:_id/activate" auth={this.props.auth} component={ActivateUser} />
        <PrivateRoute exact path="/books/:_id/show" auth={this.props.auth} component={ViewBook} />
        <PrivateRoute exact path="/reports/:_id/view" auth={this.props.auth} component={ViewReport} />
        <AdminRoute exact path="/admin/dashboard" auth={this.props.auth} component={Dashboard} />
        <AdminRoute exact path="/admin/courses/all" auth={this.props.auth} component={CourseList} />
        <AdminRoute exact path="/courses/add_course" auth={this.props.auth} component={AddCourse} />
        <AdminRoute exact path="/courses/:_id/edit_course" auth={this.props.auth} component={EditCourse} />
        <AdminRoute exact path="/courses/:_id/add_student" auth={this.props.auth} component={CourseAddStudent} />
        <AdminRoute exact path="/courses/:_id/add_book" auth={this.props.auth} component={CourseAddBook} />
        <AdminRoute exact path="/admin/students/all" auth={this.props.auth} component={StudentList} />
        <AdminRoute exact path="/students/:_id/view" auth={this.props.auth} component={ShowStudent} />
        <AdminRoute exact path="/admin/books/all" auth={this.props.auth} component={BookListContainer} />
        <AdminRoute exact path="/books/new" auth={this.props.auth} component={NewBook} />
        <AdminRoute exact path="/books/:_id/edit" auth={this.props.auth} component={EditBook} />
        <AdminRoute exact path="/admin/teachers/new" auth={this.props.auth} component={AdminTeacherNew} />
        <AdminRoute exact path="/admin/teachers/:_id/edit" auth={this.props.auth} component={AdminTeacherEdit} />
        <AdminRoute exact path="/admin/students/new" auth={this.props.auth} component={AdminStudentNew} />
        <AdminRoute exact path="/admin/students/:_id/edit" auth={this.props.auth} component={AdminStudentEdit} />
        <AdminRoute exact path="/assets" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/level_salaries" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/teacher_salaries" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/transactions" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/tuitions" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/profit" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/teacher_rates" auth={this.props.auth} component={AssetsDashboard} />
        <AdminRoute exact path="/admin/teachers/all" auth={this.props.auth} component={TeacherList} />
        <AdminRoute exact path="/teachers/:_id/view" auth={this.props.auth} component={ShowTeacher} />
        <StudentRoute exact path="/students/:_id/schedule" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/profile" auth={this.props.auth} component={StudentProfile} />
        <StudentRoute exact path="/students/:_id/dashboard" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/assets" auth={this.props.auth} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/books" auth={this.props.auth} component={StudentDashboard} />
        <TeacherRoute exact path="/teachers/:_id/dashboard" auth={this.props.auth} component={TeacherDashboard} />
        <TeacherRoute exact path="/teachers/:_id/profile" auth={this.props.auth} component={TeacherProfile} />
        <TeacherRoute exact path="/teachers/:_id/course_manager" auth={this.props.auth} component={TeacherCourseManager} />
        <TeacherRoute exact path="/teachers/:_id/new_report" auth={this.props.auth} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/edit_report" auth={this.props.auth} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/reports" auth={this.props.auth} component={AllReports} />
      </Switch>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    sessionExpired: () => dispatch(sessionExpired())
  };
}

export default connect(null, mapDispatchToProps)(App);
