import React from 'react';

class CompensationList extends React.Component {
  render() {
    let compensationList = ""
    let compensationTable = <div className="col m12">
                        <div className="card white r-box-shadow">
                          <div className="card-content">
                            <h4 className="center">当前没有补助或者罚款</h4>
                          </div>
                        </div>
                      </div>
    if(this.props.data.length > 0) {
      compensationList = this.props.data.map((compensation, idx) => {
        let cls = "red-text"
        let _amount = `-${compensation.amount.toFixed(2)}`
        if(compensation.type === "罚款") {
          cls = "green-text"
          _amount = `${compensation.amount.toFixed(2)}`
        }
        return <tr key={idx}>
                <td>{compensation.type}</td>
                <td className={cls}>{_amount}</td>
                <td>{compensation.memo}</td>
              </tr>
      })
      compensationTable = <table className="highlight">
                        <thead>
                          <tr>
                            <th>类型</th>
                            <th>金额(元)</th>
                            <th>备忘录</th>
                          </tr>
                        </thead>

                        <tbody>
                          {compensationList}
                        </tbody>
                      </table>
    }
    

    return (
      <div>
        <h6 className="airbnb-font bold">补助或者罚款列表</h6>
        <hr/>
        {compensationTable}
      </div>
    )
  }
}

export default CompensationList;