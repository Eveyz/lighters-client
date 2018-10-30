const initialState = {
  currentStudent: {},
  students: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_STUDENTS':
      return {
        currentStudent: {},
        students: [...action.payload]
      }
    case 'ADD_STUDENT':
      return {
        currentStudent: action.payload,
        students: [...state, ...action.payload]
      }
    case 'DELETE_STUDENT': 
      return {
        currentStudent: {},
        students: state.filter(student => student._id !== action.payload)
      }
    case 'UPDATE_STUDENT':
      const idx = state.findIndex(student => student._id === action.payload._id);
      return {
        currentStudent: action.payload,
        students: [
                    ...state.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.slice(idx + 1), // everything after current obj
                  ]
      }
    case "SELECT_STUDENT":
      return {
        currentStudent: action.payload,
        courses: state.students
      }
    default:
      return state;
  }
};