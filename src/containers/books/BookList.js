import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';

import { getBooks, addBook, deleteBook } from "../../actions/books_actions.js";
import Header from '../../components/layouts/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import PaginationContainer from '../../containers/PaginationContainer';

class BooksList extends React.Component {

  render() {
    let bookContent = <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有绘本，请添加</h4>;
                        </div>
                      </div>
                    </div>;
    if(this.props.books.length > 0) {
      bookContent = <PaginationContainer itemsPerPage={10} data={this.props.books} content={"BOOK"} readOnly={false} />;
    }

    return (
      <div>
        <Header />
        <Breadcrumb action="books" />
        <div className="container">
          <br />
          <Row>
            <Col m={2}>
              <Link to="/books/new" className="btn">添加绘本</Link>
            </Col>
            <Col m={10}>
              <Link to="/books/new" className="btn cyan">从CSV中导入</Link>
            </Col>
          </Row>
          <br/>
          <Row>
            {bookContent}
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    books: state.booksData.books
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    fetchBooks: () => {
      dispatch(getBooks())
    },
    addBook: () => dispatch(addBook()),
    deleteBook: () => dispatch(deleteBook())
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);