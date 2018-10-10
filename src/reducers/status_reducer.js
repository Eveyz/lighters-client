import isEmpty from 'lodash/isEmpty';

const initialState = {
  err: "",
  loading: true
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "SET_ERR_MSG":
      return {
        err: action.payload.err,
        loading: false
      }
    case "SET_LOADING_STATUS":
      return {
        err: "",
        loading: action.payload
      }
    default:
      return state;
  }
};