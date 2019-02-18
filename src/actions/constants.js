/*

GET_ITEMS
GET_ITEM
ADD_ITEM
UPDATE_ITEM
DELETE_ITEM
SELECT_ITEM

*/

// Flash Actions
export const FLASH_SUCCESS = "FLASH_SUCCESS"
export const FLASH_WARNING = "FLASH_WARNING"
export const FLASH_ERROR = "FLASH_ERROR"

// Admin Actions
export const ADMIN_CREATE_TEACHER = 'ADMIN_CREATE_TEACHER';
export const ADMIN_CREATE_STUDENT = 'ADMIN_CREATE_STUDENT';

// User Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_IDENTITY_DATA = 'SET_CURRENT_IDENTITY_DATA';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_TEACHER = 'SET_TEACHER';
export const SET_STUDENT = 'SET_STUDENT';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const SIGNUP_USER = 'SIGNUP_USER';
export const USER_FROM_TOKEN = 'USER_FROM_TOKEN';
export const USER_FROM_TOKEN_SUCCESS = 'USER_FROM_TOKEN_SUCCESS';
export const USER_FROM_TOKEN_FAILURE = 'USER_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const ADMIN_INIT = 'ADMIN_INIT';
export const ADMIN_INIT_FAILURE = 'ADMIN_INIT_FAILURE';

// Course Actions
export const GET_COURSES = 'GET_COURSES';
export const GET_COURSE_FAILURE = 'GET_COURSE_FAILURE';
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSE_FAILURE = 'ADD_COURSE_FAILURE';
export const COURSE_ADD_STUDENT = 'COURSE_ADD_STUDENT';
export const COURSE_ADD_STUDENT_FAILURE = 'COURSE_ADD_STUDENT_FAILURE';
export const COURSE_POST_STUDENT = 'COURSE_POST_STUDENT';
export const COURSE_POST_STUDENT_FAILURE = 'COURSE_POST_STUDENT_FAILURE';
export const COURSE_DELETE_STUDENT = 'COURSE_DELETE_STUDENT';
export const COURSE_DELETE_STUDENT_FAILURE = 'COURSE_DELETE_STUDENT_FAILURE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const UPDATE_COURSE_FAILURE = 'UPDATE_COURSE_FAILURE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const DELETE_COURSE_FAILURE = 'DELETE_COURSE_FAILURE';
export const SELECT_COURSE = 'SELECT_COURSE';
export const SWITCH_MODE = 'SWITCH_MODE';
export const COURSE_ADD_BOOK = 'COURSE_ADD_BOOK';
export const COURSE_REMOVE_BOOK = 'COURSE_REMOVE_BOOK';

// Book Actions
export const GET_BOOKS = 'GET_BOOKS';
export const GET_BOOK_FAILURE = 'GET_BOOK_FAILURE';
export const SELECT_BOOK = 'SELECT_BOOK';
export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';
export const DELETE_BOOK = 'DELETE_BOOK';
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE';

// Teacher Actions
export const GET_TEACHERS = 'GET_TEACHERS';
export const GET_TEACHERS_FAILURE = 'GET_TEACHERS_FAILURE';
export const GET_TEACHER = 'GET_TEACHER';
export const GET_TEACHER_FAILURE = 'GET_TEACHER_FAILURE';
export const ADD_TEACHER = 'ADD_TEACHER';
export const ADD_TEACHER_FAILURE = 'ADD_TEACHER_FAILURE';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';
export const UPDATE_TEACHER_FAILURE = 'UPDATE_TEACHER_FAILURE';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const DELETE_TEACHER_FAILURE = 'DELETE_TEACHER_FAILURE';
export const ACTIVATE_TEACHER = 'ACTIVATE_TEACHER';
export const ACTIVATE_TEACHER_FAILURE = 'ACTIVATE_TEACHER_FAILURE';
export const DEACTIVATE_TEACHER = 'DEACTIVATE_TEACHER';
export const DEACTIVATE_TEACHER_FAILURE = 'DEACTIVATE_TEACHER_FAILURE';
export const GET_ACTIVE_TEACHERS = 'GET_ACTIVE_TEACHERS';
export const GET_ACTIVE_TEACHERS_FAILURE = 'GET_ACTIVE_TEACHERS_FAILURE';
export const SELECT_TEACHER = 'SELECT_TEACHER';
export const SELECT_TEACHER_FAILURE = 'SELECT_TEACHER_FAILURE';

// Student Actions
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENTS_FAILURE = 'GET_STUDENTS_FAILURE';
export const GET_STUDENT = 'GET_STUDENT';
export const GET_STUDENT_FAILURE = 'GET_STUDENT_FAILURE';
export const ADD_STUDENT = 'ADD_STUDENT';
export const ADD_STUDENT_FAILURE = 'ADD_STUDENT_FAILURE';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const UPDATE_STUDENT_FAILURE = 'UPDATE_STUDENT_FAILURE';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';
export const SELECT_STUDENT = 'SELECT_STUDENT';
export const ACTIVATE_STUDENT = 'ACTIVATE_STUDENT';
export const ACTIVATE_STUDENT_FAILURE = 'ACTIVATE_STUDENT_FAILURE';
export const DEACTIVATE_STUDENT = 'DEACTIVATE_STUDENT';
export const DEACTIVATE_STUDENT_FAILURE = 'DEACTIVATE_STUDENT_FAILURE';
export const GET_STUDENT_REPORTS_BEGIN = 'GET_STUDENT_REPORTS_BEGIN';
export const GET_STUDENT_REPORTS_SUCCESS = 'GET_STUDENT_REPORTS_SUCCESS';
export const GET_STUDENT_REPORTS_FAILURE = 'GET_STUDENT_REPORTS_FAILURE';

// Status Actions
export const SET_ERR_MSG = 'SET_ERR_MSG';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const RESET_FLASH_MSG = 'RESET_FLASH_MSG';

// Select books widget actions
export const GROUPED_BOOKS = 'GROUPED_BOOKS';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_SERIAL = 'SELECT_SERIAL';
export const RESET_SELECT_BOOKS = 'RESET_SELECT_BOOKS';
export const SELECT_ADD_BOOK = 'SELECT_ADD_BOOK';
export const SELECT_REMOVE_BOOK = 'SELECT_REMOVE_BOOK';
export const SELECT_ADD_KEYWORD = 'SELECT_ADD_KEYWORD';
export const SELECT_REMOVE_KEYWORD = 'SELECT_REMOVE_KEYWORD';

export const REVIEW_GROUPED_BOOKS = 'REVIEW_GROUPED_BOOKS';
export const REVIEW_SELECT_CATEGORY = 'REVIEW_SELECT_CATEGORY';
export const REVIEW_SELECT_SERIAL = 'REVIEW_SELECT_SERIAL';
export const REVIEW_RESET_SELECT_BOOKS = 'REVIEW_RESET_SELECT_BOOKS';
export const REVIEW_ADD_BOOKS = 'REVIEW_ADD_BOOKS';
export const REVIEW_UPDATE_BOOKS = 'REVIEW_UPDATE_BOOKS';
export const REVIEW_REMOVE_BOOKS = 'REVIEW_REMOVE_BOOKS';
export const REVIEW_ADD_KEYWORD = 'REVIEW_ADD_KEYWORD';
export const REVIEW_REMOVE_KEYWORD = 'REVIEW_REMOVE_KEYWORD';

export const NEW_GROUPED_BOOKS = 'NEW_GROUPED_BOOKS';
export const NEW_SELECT_CATEGORY = 'NEW_SELECT_CATEGORY';
export const NEW_SELECT_SERIAL = 'NEW_SELECT_SERIAL';
export const NEW_RESET_SELECT_BOOKS = 'NEW_RESET_SELECT_BOOKS';
export const NEW_ADD_BOOKS = 'NEW_ADD_BOOKS';
export const NEW_UPDATE_BOOKS = 'NEW_UPDATE_BOOKS';
export const NEW_REMOVE_BOOKS = 'NEW_REMOVE_BOOKS';
export const NEW_ADD_KEYWORD = 'NEW_ADD_KEYWORD';
export const NEW_REMOVE_KEYWORD = 'NEW_REMOVE_KEYWORD';

export const FUTURE_GROUPED_BOOKS = 'FUTURE_GROUPED_BOOKS';
export const FUTURE_SELECT_CATEGORY = 'FUTURE_SELECT_CATEGORY';
export const FUTURE_SELECT_SERIAL = 'FUTURE_SELECT_SERIAL';
export const FUTURE_RESET_SELECT_BOOKS = 'FUTURE_RESET_SELECT_BOOKS';
export const FUTURE_ADD_BOOKS = 'FUTURE_ADD_BOOKS';
export const FUTURE_UPDATE_BOOKS = 'FUTURE_UPDATE_BOOKS';
export const FUTURE_REMOVE_BOOKS = 'FUTURE_REMOVE_BOOKS';
export const FUTURE_ADD_KEYWORD = 'FUTURE_ADD_KEYWORD';
export const FUTURE_REMOVE_KEYWORD = 'FUTURE_REMOVE_KEYWORD';

// Reports actions
export const GET_REPORTS = 'GET_REPORTS'
export const GET_REPORTS_FAILURE = 'GET_REPORTS_FAILURE'
export const ADD_REPORT = 'ADD_REPORT'
export const ADD_REPORT_FAILURE = 'ADD_REPORT_FAILURE'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const UPDATE_REPORT_FAILURE = 'UPDATE_REPORT_FAILURE'
export const REPORT_UPLOAD_AUDIOS = 'REPORT_UPLOAD_AUDIOS'
export const REPORT_UPLOAD_AUDIOS_FAILURE = 'REPORT_UPLOAD_AUDIOS_FAILURE'
export const DELETE_REPORT = 'DELETE_REPORT'
export const DELETE_REPORT_FAILURE = 'DELETE_REPORT_FAILURE'
export const SET_CURRENT_REPORT = 'SET_CURRENT_REPORT'
export const REMOVE_UPLOADED_FILE = 'REMOVE_UPLOADED_FILE'
export const REMOVE_UPLOADED_FILE_FAILURE = 'REMOVE_UPLOADED_FILE_FAILURE'

// Schedules actions
export const GET_SCHEDULES = "GET_SCHEDULES";
export const GET_SCHEDULES_FAILURE = "GET_SCHEDULES";
export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const ADD_SCHEDULE_FAILURE = "ADD_SCHEDULE_FAILURE";
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const DELETE_SCHEDULE_FAILURE = "DELETE_SCHEDULE_FAILURE";
export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
export const UPDATE_SCHEDULE_FAILURE = "UPDATE_SCHEDULE_FAILURE";
export const SELECT_SCHEDULE = "SELECT_SCHEDULE";
export const SELECT_SCHEDULE_FAILURE = "SELECT_SCHEDULE_FAILURE";

// Level Salary
export const GET_LEVEL_SALARY = "GET_LEVEL_SALARY";
export const GET_LEVEL_SALARY_FAILURE = "GET_LEVEL_SALARY";
export const ADD_LEVEL_SALARY = "ADD_LEVEL_SALARY";
export const ADD_LEVEL_SALARY_FAILURE = "ADD_LEVEL_SALARY_FAILURE";
export const DELETE_LEVEL_SALARY = "DELETE_LEVEL_SALARY";
export const DELETE_LEVEL_SALARY_FAILURE = "DELETE_LEVEL_SALARY_FAILURE";
export const UPDATE_LEVEL_SALARY = "UPDATE_LEVEL_SALARY";
export const UPDATE_LEVEL_SALARY_FAILURE = "UPDATE_LEVEL_SALARY_FAILURE";

// mode action
export const SET_MODE = "SET_MODE";

// paycheck actions
export const GET_PAYCHECKS = "GET_PAYCHECKS";
export const GET_PAYCHECKS_FAILURE = "GET_PAYCHECKS_FAILURE";
export const UPDATE_PAYCHECK = "UPDATE_PAYCHECK";
export const UPDATE_PAYCHECK_FAILURE = "UPDATE_PAYCHECK_FAILURE";
export const SELECT_PAYCHECK = "SELECT_PAYCHECK";

// compensation actions
export const GET_COMPENSATIONS = "GET_COMPENSATIONS";
export const GET_COMPENSATIONS_FAILURE = "GET_COMPENSATIONS_FAILURE";
export const GET_COMPENSATION = "GET_COMPENSATION";
export const GET_COMPENSATION_FAILURE = "GET_COMPENSATION_FAILURE";
export const ADD_COMPENSATION = "ADD_COMPENSATION";
export const ADD_COMPENSATION_FAILURE = "ADD_COMPENSATION_FAILURE";
export const UPDATE_COMPENSATION = "UPDATE_COMPENSATION";
export const UPDATE_COMPENSATION_FAILURE = "UPDATE_COMPENSATION_FAILURE";
export const DELETE_COMPENSATION = "DELETE_COMPENSATION";
export const DELETE_COMPENSATION_FAILURE = "DELETE_COMPENSATION_FAILURE";

// transaction actions
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONS_FAILURE = "GET_TRANSACTIONS_FAILURE";
export const GET_TRANSACTION = "GET_TRANSACTION";
export const GET_TRANSACTION_FAILURE = "GET_TRANSACTION_FAILURE";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const ADD_TRANSACTION_FAILURE = "ADD_TRANSACTION_FAILURE";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const UPDATE_TRANSACTION_FAILURE = "UPDATE_TRANSACTION_FAILURE";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const DELETE_TRANSACTION_FAILURE = "DELETE_TRANSACTION_FAILURE";