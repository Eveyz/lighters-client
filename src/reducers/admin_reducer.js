const initialState = {
  books: [],
  courses: [],
  teachers: [],
  students: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'ADMIN_INIT':
      return {
        books: action.payload.books,
        courses: action.payload.courses,
        teachers: action.payload.teachers,
        students: action.payload.students
      }
    case 'ADMIN_INIT_FAILURE':
      return state;
    default:
      return state;
  }
};