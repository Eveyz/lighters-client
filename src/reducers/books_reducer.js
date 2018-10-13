const initialState = {
  currentBook: {course: false},
  books: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_BOOKS':
      return {
        currentBook: {},
        books: [...action.payload]
      }
    case 'ADD_BOOK':
      return {
        currentBook: action.payload,
        books: [...state, ...action.payload]
      }
    case 'DELETE_BOOK': 
      return {
        currentBook: {},
        books: state.filter(book => book._id !== action.payload)
      }
    case 'UPDATE_BOOK':
      const idx = state.findIndex(book => book._id === action.payload._id);
      return {
        currentBook: action.payload,
        books: [
                    ...state.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};