const initialState = {
  currentTeacher: {course: false},
  teachers: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TEACHERS':
      return {
        currentTeacher: {},
        teachers: [...action.payload]
      }
    case 'ADD_TEACHER':
      return {
        currentTeacher: action.payload,
        teachers: [...state, ...action.payload]
      }
    case 'DELETE_TEACHER': 
      return {
        currentTeacher: {},
        teachers: state.filter(teacher => teacher._id !== action.payload)
      }
    case 'UPDATE_TEACHER':
      const idx = state.findIndex(teacher => teacher._id === action.payload._id);
      return {
        currentTeacher: action.payload,
        teachers: [
                    ...state.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};