const initialState = {
  currentStudent: {},
  students: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_STUDENTS':
      return {
        currentStudent: state.currentStudent,
        students: [...action.payload]
      }
    case 'ADD_STUDENT':
      return {
        currentStudent: action.payload,
        students: [...state.students, ...action.payload]
      }
    case 'DELETE_STUDENT': 
      return {
        currentStudent: state.currentStudent._id === action.payload ? {} : state.currentStudent,
        students: state.students.filter(student => student._id !== action.payload)
      }
    case 'UPDATE_STUDENT':
      const idx = state.students.findIndex(student => student._id === action.payload._id);
      return {
        currentStudent: action.payload,
        students: [
                    ...state.students.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.students.slice(idx + 1), // everything after current obj
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