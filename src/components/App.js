import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import {AppContextProvider, AppContext} from '../AppContext'

import '../css/App.css';
import '../css/flash.css';
import '../css/richtext-editor.css';

import { AdminRoute, TeacherRoute, StudentRoute, PrivateRoute } from './auth/requireAuth';

// Components
import asyncComponent from '../components/AsyncComponent';

const Home = asyncComponent(() => import("./layouts/Home"));
const CourseHierarchy = asyncComponent(() => import('./mainpages/courseHierarchy'));
const LoginForm = asyncComponent(() => import('../containers/users/LoginForm'));
const SignupForm = asyncComponent(() => import('../containers/users/SignupForm'));
const ForgetPassword = asyncComponent(() => import('../containers/users/ForgetPassword'));
const ResetPassword = asyncComponent(() => import('../containers/users/ResetPassword'));
const Dashboard = asyncComponent(() => import('../containers/users/admin/dashboard'));
// const BookListContainer = asyncComponent(() => import('../containers/books/BookListContainer'));
// const NewBook = asyncComponent(() => import('../components/books/NewBook'));
// const EditBook = asyncComponent(() => import('../components/books/EditBook'));
// const ViewBook = asyncComponent(() => import('../components/books/ViewBook'));
const TableCourseList = asyncComponent(() => import('../containers/courses/TableCourseList'));
const AddCourse = asyncComponent(() => import('../containers/courses/AddCourse'));
const EditCourse = asyncComponent(() => import('../containers/courses/EditCourse'));
const CourseAddStudent = asyncComponent(() => import('../containers/courses/AddStudent'));
// const CourseAddBook = asyncComponent(() => import('../containers/courses/AddBook'));
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

const App = props => {

  const [context, setContext] = useContext(AppContext)
  console.log("context: ", context)
  
  useEffect(() => {
    if(!axios.defaults.headers.common['authorization']) {
      let token = sessionStorage.getItem("jwtToken");
      if(token) {
        setAuthToken(token)
      }
    }
  }, [])

  return(
    <AppContextProvider path={props.location.pathname}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/advantage" component={CourseHierarchy} />
        <Route exact path="/teachers/new" component={NewTeacher} />
        <Route exact path="/students/new" component={NewStudent} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/password/reset" component={ForgetPassword} />
        <Route exact path="/users/reset_password" component={ResetPassword} />
        {/* <Route exact path="/teachers/me" component={BookListContainer} /> */}
        {/* <Route exact path="/students/me" component={BookListContainer} /> */}
        <PrivateRoute exact path="/users/:_id/activate" state={context} component={ActivateUser} />
        {/* <PrivateRoute exact path="/books/:_id/show" state={context} component={ViewBook} /> */}
        <PrivateRoute exact path="/reports/:_id/view" state={context} component={ViewReport} />
        <AdminRoute exact path="/admin/dashboard" state={context} component={Dashboard} />
        <AdminRoute exact path="/admin/courses/all" state={context} component={TableCourseList} />
        <AdminRoute exact path="/courses/add_course" state={context} component={AddCourse} />
        <AdminRoute exact path="/courses/:_id/edit_course" state={context} component={EditCourse} />
        <AdminRoute exact path="/courses/:_id/add_student" state={context} component={CourseAddStudent} />
        {/* <AdminRoute exact path="/courses/:_id/add_book" state={context} component={CourseAddBook} /> */}
        <AdminRoute exact path="/admin/students/all" state={context} component={StudentList} />
        <AdminRoute exact path="/students/:_id/view" state={context} component={ShowStudent} />
        {/* <AdminRoute exact path="/admin/books/all" state={context} component={BookListContainer} />
        <AdminRoute exact path="/books/new" state={context} component={NewBook} />
        <AdminRoute exact path="/books/:_id/edit" state={context} component={EditBook} /> */}
        <AdminRoute exact path="/admin/teachers/new" state={context} component={AdminTeacherNew} />
        <AdminRoute exact path="/admin/teachers/:_id/edit" state={context} component={AdminTeacherEdit} />
        <AdminRoute exact path="/admin/students/new" state={context} component={AdminStudentNew} />
        <AdminRoute exact path="/admin/students/:_id/edit" state={context} component={AdminStudentEdit} />
        <AdminRoute exact path="/assets" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/level_salaries" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/teacher_salaries" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/transactions" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/tuitions" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/profit" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/assets/teacher_rates" state={context} component={AssetsDashboard} />
        <AdminRoute exact path="/admin/teachers/all" state={context} component={TeacherList} />
        <AdminRoute exact path="/teachers/:_id/view" state={context} component={ShowTeacher} />
        <StudentRoute exact path="/students/:_id/schedule" state={context} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/profile" state={context} component={StudentProfile} />
        <StudentRoute exact path="/students/:_id/dashboard" state={context} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/assets" state={context} component={StudentDashboard} />
        <StudentRoute exact path="/students/:_id/books" state={context} component={StudentDashboard} />
        <TeacherRoute exact path="/teachers/:_id/dashboard" state={context} component={TeacherDashboard} />
        <TeacherRoute exact path="/teachers/:_id/profile" state={context} component={TeacherProfile} />
        <TeacherRoute exact path="/teachers/:_id/course_manager" state={context} component={TeacherCourseManager} />
        <TeacherRoute exact path="/teachers/:_id/new_report" state={context} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/edit_report" state={context} component={ReportFormContainer} />
        <TeacherRoute exact path="/teachers/:_id/reports" state={context} component={AllReports} />
      </Switch>
    </AppContextProvider>
  )
}

export default App
