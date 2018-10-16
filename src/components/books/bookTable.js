import React from 'react';

import BookWidget from '../../containers/books/BookWidget';

class BookTable extends React.Component {
  render() {
    let booksList = this.props.books.map((book, idx) => {
      return <BookWidget key={idx} type={this.props.type} book={book} />
    });

    return(
      <table>
        <thead>
          <tr>
            <th></th>
            <th>RAZ等级</th>
            <th>蓝思等级</th>
            <th>绘本分类</th>
            <th>绘本系列名</th>
            <th>绘本名称</th>
          </tr>
        </thead>

        <tbody>
          {booksList}
        </tbody>
      </table>
    )
  }
}

export default BookTable;
