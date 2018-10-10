export default (state = [], action) => {
  switch(action.type) {
    case 'GET_STUDENTS':
      return [...action.payload];
    case 'ADD_STUDENT':
    return [...state, ...action.payload];
    case 'DELETE_STUDENT': 
      const currentStudentToDelete = state;
      const indexToDelete = currentStudentToDelete.findIndex(
        function(student) {
          return student._id === action.payload.id;
        }
      )
      return [...currentStudentToDelete.slice(0, indexToDelete), ...currentStudentToDelete.slice(indexToDelete + 1)];
    case 'UPDATE_STUDENT':
      const currentStudentToUpdate = state;
      const indexToUpdate = currentStudentToUpdate.findIndex(
        function(student) {
          return student._id === action.payload.student._id;
        }
      )
      const newStudentToUpdate = action.payload.student
      return [...currentStudentToUpdate.slice(0, indexToUpdate), newStudentToUpdate, ...currentStudentToUpdate.slice(indexToUpdate + 1)]
    default:
      return state;
  }
};