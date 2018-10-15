import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import UserReducer from './users_reducer';
import BookReducer from './books_reducer';
import CourseReducer from './courses_reducer';
import TeacherReducer from './teachers_reducer';
import StudentReducer from './students_reducer';
import AuthReducer from './auth_reducer';
import StatusReducer from './status_reducer';

const rootReducer = combineReducers({
  identity: UserReducer,
  booksData: BookReducer,
  coursesData: CourseReducer,
  teachersData: TeacherReducer,
  studentsData: StudentReducer,
  auth: AuthReducer,
  status: StatusReducer,
  router: routerReducer
});

export default rootReducer;