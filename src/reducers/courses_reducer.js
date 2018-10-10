export default (state = [], action) => {
  switch(action.type) {
    case 'GET_COURSES':
      return action.payload;
    case 'ADD_COURSE':
      return [...state, action.payload];
    case 'DELETE_COURSE': 
      return state.filter(course => course._id !== action.payload);
    case 'UPDATE_COURSE':
      const idx = state.findIndex(course => course._id === action.payload._id);
      return [
        ...state.slice(0, idx), // everything before current obj
        action.payload,
        ...state.slice(idx + 1), // everything after current obj
      ]
    default:
      return state;
  }
};