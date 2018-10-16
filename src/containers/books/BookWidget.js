import React from 'react';
import { connect } from 'react-redux';

import { postBook, removeBook } from '../../actions/courses_actions';

class BookWidget extends React.Component {
  constructor(props) {
    super(props)

    this.clickButton = this.clickButton.bind(this);
  }

  clickButton() {
    if(this.props.type === "ADD") {
      this.props.addBook(this.props.course._id, this.props.book._id);
    } else {
      this.props.removeBook(this.props.course._id, this.props.book._id);
    }
  }

  render() {
    let iconStyle = {
      cursor: "pointer"
    };
    let button = this.props.type == "ADD" ? 
    <i className="material-icons green-text icon-clickable" style={iconStyle} onClick={this.clickButton.bind(this)}>add</i> 
    : 
    <i className="material-icons red-text icon-clickable" style={iconStyle} onClick={this.clickButton.bind(this)}>delete</i>

    if(this.props.keywords) {
      let keywords = [];
      this.props.book.keywords.forEach(function(keyword) {
        keywords.push(keyword["content"]);
      });

      // var keywordsList = <KeywordList keywords={keywords} edit={this.props.edit} deleteKeyword={this.deleteKeyword.bind(this)} />

      let keywordsList = "";

      return(
        <tr>
          <td>{button}</td>
          <td>{this.props.book.rlevel}</td>
          <td>{this.props.book.lslevel}</td>
          <td>{this.props.book.category}</td>
          <td>{this.props.book.serials}</td>
          <td>{this.props.book.name}</td>
          <td>{keywordsList}</td>
        </tr>
      )
    }

    return(
      <tr>
        <td>{button}</td>
        <td>{this.props.book.rlevel}</td>
        <td>{this.props.book.lslevel}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
      </tr>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    course: state.coursesData.currentCourse
  }
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addBook: (id, bookID) => dispatch(postBook(id, bookID)),
    removeBook: (id, bookID) => dispatch(removeBook(id, bookID))
  }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BookWidget) 