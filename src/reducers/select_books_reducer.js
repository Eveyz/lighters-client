const initialState = {
  groupedBooks: {},
  categories: [],
  category: "",
  serialName: ""
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'GROUPED_BOOKS':
      return {
        groupedBooks: action.payload.groupedBooks,
        categories: action.payload.categories,
        category: state.category,
        serialName: state.serialName
      }
    case 'SELECT_CATEGORY':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: action.payload,
        serialName: state.serialName
      }
    case 'SELECT_SERIAL':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: action.payload
      }
    default:
      return state;
  }
};