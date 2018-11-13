import axios from 'axios';
import history from '../history';
import { GET_BOOKS, GET_BOOK_FAILURE, ADD_BOOK, ADD_BOOK_FAILURE, UPDATE_BOOK, UPDATE_BOOK_FAILURE, DELETE_BOOK, DELETE_BOOK_FAILURE } from './constants';

export const getBooks = () => {
  return (dispatch) => {
    axios.get(`/books`)
      .then((response) => {
        dispatch({type: GET_BOOKS, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: GET_BOOK_FAILURE, payload: err})
      })
  }
};

export const addBook = (book) => {
  return (dispatch) => {
    var book_data = new FormData();
    console.log(book['file']);
    if(book['file']) {
      book_data.append('file', book['file']);
    }
    let book_json = JSON.stringify(book, null, 2);
    book_data.append('book', book_json);
    axios.post(`/books`, book_data)
      .then((response) => {
        dispatch({type: ADD_BOOK, payload: response.data})
        history.push("/books");
      })
      .catch((err) => {
        dispatch({type: ADD_BOOK_FAILURE, payload: "there was an error while posting a new book"})
      })
  }
};

export const updateBook = (book) => {
  return (dispatch) => {
    axios.put(`/books/${book.id}`)
      .then((response) => {
        dispatch({type: UPDATE_BOOK, payload: book})
      })
      .catch((err) => {
        dispatch({type: UPDATE_BOOK_FAILURE, payload: err})
      })
  }
};

export const deleteBook = (id) => {
  return (dispatch) => {
    axios.delete(`/books/${id}`)
      .then((response) => {
        dispatch({type: DELETE_BOOK, payload: id})
      })
      .catch((err) => {
        dispatch({type: DELETE_BOOK_FAILURE, payload: err})
      })
  }
};