export default (state = [], action) => {
  switch(action.type) {
    case 'GET_TEACHERS':
      return [...action.payload];
    case 'ADD_TEACHER':
    return [...state, ...action.payload];
    case 'DELETE_TEACHER': 
      const currentTeacherToDelete = state;
      const indexToDelete = currentTeacherToDelete.findIndex(
        function(teacher) {
          return teacher._id === action.payload.id;
        }
      )
      return [...currentTeacherToDelete.slice(0, indexToDelete), ...currentTeacherToDelete.slice(indexToDelete + 1)];
    case 'UPDATE_TEACHER':
      const currentTeacherToUpdate = state;
      const indexToUpdate = currentTeacherToUpdate.findIndex(
        function(teacher) {
          return teacher._id === action.payload.teacher._id;
        }
      )
      const newTeacherToUpdate = action.payload.teacher
      return [...currentTeacherToUpdate.slice(0, indexToUpdate), newTeacherToUpdate, ...currentTeacherToUpdate.slice(indexToUpdate + 1)]
    default:
      return state;
  }
};