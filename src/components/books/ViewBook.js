import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'

class ViewBook extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  render() {
    const { numPages, pageNumber } = this.state

    return(
      <div>
        <Document
          file={`http://kmmc.in/wp-content/uploads/2014/01/lesson2.pdf`}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.booksData.currentBook
  };
}

export default connect(mapStateToProps, null)(ViewBook)