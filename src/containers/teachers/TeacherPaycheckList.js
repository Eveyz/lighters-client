import React from 'react'

class TeacherPaycheckList extends React.Component {
  render() {
    let paycheckList = this.props.paychecks.map((pc, idx) => {
      return <tr key={idx}>
              <td>{pc.month}</td>
              <td>{pc.reports.length}</td>
              <td>{pc.amount}</td>
            </tr>
    })
    let paychecks = <table className="highlight">
                          <thead>
                            <tr>
                              <th>月份</th>
                              <th>反馈表数量</th>
                              <th>金额(元)</th>
                            </tr>
                          </thead>

                          <tbody>
                            {paycheckList}
                          </tbody>
                        </table>

    return(
      <div>
        {paychecks}
      </div>
    )
  }
}

export default TeacherPaycheckList