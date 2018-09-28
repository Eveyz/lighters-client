export default (state = [], action) => {
  switch(action.type) {
    case 'GET_BOOKS':
      return [...action.payload];
      break;
    case 'ADD_BOOK':
      return [...state, ...action.payload];
      break;
    case 'DELETE_BOOK': 
      const currentBookToDelete = state.books;
      const indexToDelete = currentBookToDelete.findIndex(
        function(book) {
          return book.id === action.payload.id;
        }
      )
      return [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)];
      break;
    case 'UPDATE_BOOK':
      const currentBookToUpdate = state.books;
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book.id === action.payload.book.id;
        }
      )
      const newBookToUpdate = action.payload.book
      return [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]
      break;
    default:
      return state;
  }
};