import { SET_ERR_MSG, SET_LOADING_STATUS } from './constants';

export const setLoadingStatus = (loading) => {
  return function(dispatch){
    dispatch({type: SET_LOADING_STATUS, payload: loading})
  }
};

export const setErrMsg = (err) => {
  return function(dispatch) {
    dispatch({type: SET_ERR_MSG, payload: err})
  }
};