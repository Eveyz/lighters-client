import { combineReducers } from 'redux';

import UserReducer from './users_reducer';
import BookReducer from './books_reducer';
import CourseReducer from './courses_reducer';
import TeacherReducer from './teachers_reducer';
import StudentReducer from './students_reducer';
import AuthReducer from './auth_reducer';
import AdminReducer from './admin_reducer';
import StatusReducer from './status_reducer';

const rootReducer = combineReducers({
  identity: UserReducer,
  books: BookReducer,
  courses: CourseReducer,
  teachers: TeacherReducer,
  students: StudentReducer,
  auth: AuthReducer,
  status: StatusReducer
});

export default rootReducer;