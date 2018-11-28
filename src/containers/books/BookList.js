import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';

import { getBooks, addBook, deleteBook } from "../../actions/books_actions.js";
import Header from '../../components/layouts/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import PaginationContainer from '../../containers/PaginationContainer';

class BooksList extends React.Component {

  componentWillMount() {
    this.props.fetchBooks()
  }

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
  return {
    books: state.booksData.books
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => {
      dispatch(getBooks())
    },
    addBook: () => dispatch(addBook()),
    deleteBook: () => dispatch(deleteBook())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);