const initialState = {
  currentCourse: {},
  searchStudent: true,
  courses: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "GET_COURSES":
      return {
        currentCourse: state.currentCourse,
        searchStudent: state.searchStudent,
        courses: [...action.payload]
      }
    case "ADD_COURSE":
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: [...state, action.payload]
      }
    case "DELETE_COURSE":
      return {
        currentCourse: state.currentCourse,
        searchStudent: state.searchStudent,
        courses: state.filter(course => course._id !== action.payload)
      }
    case "UPDATE_COURSE":
      const idx = state.courses.findIndex(course => course._id === action.payload._id);
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: [
                    ...state.courses.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.courses.slice(idx + 1), // everything after current obj
                  ]
      }
    case "SELECT_COURSE":
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: state.courses
      }
    case "SWITCH_MODE":
      return {
        currentCourse: state.currentCourse,
        searchStudent: action.payload,
        courses: state.courses
      }
    case "COURSE_POST_STUDENT":
      const index = state.courses.findIndex(course => course._id === action.payload._id);
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: [
                    ...state.courses.slice(0, index), // everything before current obj
                    action.payload,
                    ...state.courses.slice(index + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};