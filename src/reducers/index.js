import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import UserReducer from './users_reducer';
import BookReducer from './books_reducer';
import CourseReducer from './courses_reducer';
import TeacherReducer from './teachers_reducer';
import StudentReducer from './students_reducer';
import ReportReducer from './reports_reducer';
import AuthReducer from './auth_reducer';
import StatusReducer from './status_reducer';
import SelectBookReducer from './select_books_reducer';
import ReviewBookReducer from './review_books_reducer';
import NewBoookReducer from './new_books_reducer';
import FutureBookReducer from './future_books_reducer';
import SchedulesReducer from './schedules_reducer';
import LevelSalaryReducer from './level_salary_reducer';
import ModeReducer from './mode_reducer';

const rootReducer = combineReducers({
  identity: UserReducer,
  booksData: BookReducer,
  coursesData: CourseReducer,
  teachersData: TeacherReducer,
  studentsData: StudentReducer,
  reportsData: ReportReducer,
  auth: AuthReducer,
  status: StatusReducer,
  mode: ModeReducer,
  selectBooks: SelectBookReducer,
  reviewBooks: ReviewBookReducer,
  newBooks: NewBoookReducer,
  futureBooks: FutureBookReducer,
  schedulesData: SchedulesReducer,
  levelSalary: LevelSalaryReducer,
  router: routerReducer
});

export default rootReducer;