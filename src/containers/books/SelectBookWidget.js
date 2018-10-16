import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { selectCategory, selectSerial } from "../../actions/select_book_actions";
import BookWidget from './BookWidget';
import BookTable from '../../components/books/bookTable';
import '../../css/App.css';

class SelectBookWidget extends React.Component {
  constructor(props) {
    super(props)

    this.categoryValue = React.createRef();
    this.serialNameValue = React.createRef();

    this.selectCategory = this.selectCategory.bind(this);
    this.selectSerial = this.selectSerial.bind(this);
  }

  initMaterilize() {
    M.AutoInit();
  }

  componentDidMount() {
    this.initMaterilize();
  }

  componentDidUpdate() {
    this.initMaterilize();
  }

  selectCategory() {
    let category = this.categoryValue.current.value;
    this.props.selectCategory(category);
    this.props.selectSerial("");
  }

  selectSerial() {
    let serialName = this.serialNameValue.current.value;
    this.props.selectSerial(serialName);
  }
  
  render() {

    let categories = "";
    if(this.props.categories.length > 0) {
      categories = this.props.categories.map((category, idx) => {
        return <option key={idx}>{category}</option>;
      });
    }
    let categorySelect = <div className="input-field col s12">
                            <select
                              defaultValue="default" 
                              onChange={this.selectCategory}
                              ref={this.categoryValue}
                            >
                              <option value="default" disabled>请选择绘本分类</option>
                              {categories}
                            </select>
                            <label>请选择绘本分类</label>
                          </div>;

    let disabled = this.props.category === "" ? true : false;
    let serialsBooks = "";
    if(!disabled) {
      let serials = Object.keys(this.props.groupedBooks[this.props.category]);
      serialsBooks = serials.map((serial, idx) => {
        return <option key={idx}>{serial}</option>;
      });
    }
    let serialsSelect = <div className="input-field col s12">
                          <select
                            defaultValue="default" 
                            onChange={this.selectSerial}
                            disabled={disabled}
                            ref={this.serialNameValue}
                          >
                            <option value="default" disabled>请选择绘本系列</option>
                            {serialsBooks}
                          </select>
                          <label>请选择绘本系列</label>
                        </div>;

    let bookTable = "";
    if(this.props.category != "" && this.props.serialName != "") {
      let books = this.props.groupedBooks[this.props.category][this.props.serialName];
      bookTable = books.length > 0 ? <BookTable books={books} type="ADD" /> : "";
    }

    return (
      <div>
        <div className="row no-margin">
          <div className="input-field col m6">{categorySelect}</div>
          <div className="input-field col m6">{serialsSelect}</div>
        </div>

        <div className="books-table">
          {bookTable}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    groupedBooks: state.selectBooks.groupedBooks,
    categories: state.selectBooks.categories,
    category: state.selectBooks.category,
    serialName: state.selectBooks.serialName,
    assignedBooks: state.coursesData.books,
    books: state.booksData.books
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    selectSerial: (serialName) => dispatch(selectSerial(serialName))
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBookWidget);