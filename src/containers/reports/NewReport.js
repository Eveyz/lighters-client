import React from 'react';
import { Row, Col, Card } from 'react-materialize';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

class NewReport extends React.Component {
  render = () => {
    return(
      <div>
        <Header />
        <div className="container">
          <Row>
            <Col m={12} s={12}>
              <Card className='white r-box-shadow' textClassName='black-text' title=''>
              <h5>课程基本信息</h5>
              </Card>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    )
  }
}

export default NewReport;