import { RESET_FLASH_MSG, SET_ERR_MSG, SET_LOADING_STATUS, LOGIN_USER_FAILURE } from '../actions/constants'

const initialState = {
  success: true,
  msg: "",
  loading: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_ERR_MSG:
      return {
        success: false,
        msg: action.payload.err,
        loading: false
      }
    case SET_LOADING_STATUS:
      return {
        success: true,
        msg: "",
        loading: action.payload
      }
    case LOGIN_USER_FAILURE:
      return action.payload
    case RESET_FLASH_MSG:
      return initialState
    default:
      return state;
  }
};