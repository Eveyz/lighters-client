import axios from 'axios';
import history from '../history';
import { GET_BOOKS, GET_BOOK_FAILURE, SELECT_BOOK, ADD_BOOK, ADD_BOOK_FAILURE, UPDATE_BOOK, UPDATE_BOOK_FAILURE, DELETE_BOOK, DELETE_BOOK_FAILURE } from './constants';

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

export const selectBook = (book, path) => {
  return (dispatch) => {
    dispatch({type: SELECT_BOOK, payload: book})
    if(path) {
      history.push(path)
    }
  }
}

export const addBook = (book) => {
  return (dispatch) => {
    let book_data = new FormData();
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
    let { id, ..._book } = book;
    let book_data = new FormData();
    if(book['file'] && !book['file'].originalname) {
      book_data.append('file', book['file']);
    }
    let book_json = JSON.stringify(_book);
    book_data.append('book', book_json);

    axios.put(`/books/${id}`, book_data)
      .then((response) => {
        dispatch({type: UPDATE_BOOK, payload: response.data})
        history.push(`/books/${id}`);
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