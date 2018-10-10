import axios from 'axios';

export const getBooks = () => {
  return function(dispatch){
    axios.get("/books")
      .then(function(response) {
        dispatch({type: "GET_BOOKS", payload: response.data})
      })
      .catch(function(err){
        dispatch({type: "GET_BOOK_REJECTED", payload: err})
      })
  }
};

export const addBook = (book) => {
  return function(dispatch) {
    axios.post("/books", book)
      .then(function(response){
        dispatch({type: "ADD_BOOK", payload: response.data})
      })
      .catch(function(err){
        dispatch({type: "ADD_BOOK_REJECTED", payload: "there was an error while posting a new book"})
      })
  }
};

export const updateBook = (book) => {
  return function(dispatch) {
    axios.put("/books/" + book.id)
      .then(function(response){
        dispatch({type: "UPDATE_BOOK", payload: book})
      })
      .catch(function(err){
        dispatch({type: "UPDATE_BOOK_REJECTED", payload: err})
      })
  }
};

export const deleteBook = (id) => {
  return function(dispatch) {
    axios.delete("/books/" + id)
      .then(function(response){
        dispatch({type: "DELETE_BOOK", payload: id})
      })
      .catch(function(err){
        dispatch({type: "DELETE_BOOK_REJECTED", payload: err})
      })
  }
};