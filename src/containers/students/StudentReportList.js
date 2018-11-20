import React from 'react';

import { Row } from 'react-materialize';
import PaginationContainer from '../../containers/PaginationContainer';

class StudentReportList extends React.Component {
  render() {
    let reportContent = <h5 className="center">当前没有课程反馈表</h5>;

    if(this.props.reports.length > 0) {
      reportContent = <PaginationContainer itemsPerPage={10} data={this.props.reports} content={"REPORT"} readOnly={true} />;
    }

    return(
      <div>
        <div className="no-margin">
          <Row>
            <div className="card white r-box-shadow">
              <div className="card-content">
                {reportContent}
              </div>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}

export default StudentReportList;