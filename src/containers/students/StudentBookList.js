import React from 'react';
import { Row } from 'react-materialize';

import PaginationContainer from '../../containers/PaginationContainer';

class StudentBookList extends React.Component {

  render() {
    let bookContent = <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有绘本</h4>
                        </div>
                      </div>

    if(this.props.books.length > 0) {
      bookContent = <PaginationContainer itemsPerPage={10} data={this.props.books} content={"BOOK"} readOnly={true} />;
    }

    return (
      <div>
        <div className="no-margin">
          <Row>
            <div className="card white r-box-shadow">
              <div className="card-content">
                {bookContent}
              </div>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}

export default StudentBookList;