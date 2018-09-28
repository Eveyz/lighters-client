import { combineReducers } from 'redux';

import LoginReducer from './login_reducer';
import BookReducer from './books_reducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  books: BookReducer
});

export default rootReducer;