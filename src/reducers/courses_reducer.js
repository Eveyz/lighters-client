const initialState = {
  currentCourse: {course: false},
  courses: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "GET_COURSES":
      return {
        currentCourse: {},
        courses: [...action.payload]
      }
    case "ADD_COURSE":
      return {
        currentCourse: action.payload,
        courses: [...state, action.payload]
      }
    case "DELETE_COURSE":
      return {
        currentCourse: {},
        courses: state.filter(course => course._id !== action.payload)
      }
    case "UPDATE_COURSE":
      const idx = state.findIndex(course => course._id === action.payload._id);
      return {
        currentCourse: action.payload,
        courses: [
                    ...state.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.slice(idx + 1), // everything after current obj
                  ]
      }
    case "SELECT_COURSE":
      return {
        currentCourse: action.payload,
        courses: state.courses
      }
    default:
      return state;
  }
};