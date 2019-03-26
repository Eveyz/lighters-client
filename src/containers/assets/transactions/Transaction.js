import React from 'react';

import { getLocalTime } from '../../../ultis';

class Transaction extends React.Component {
  render() {
    let td = this.props.transaction.status === "IN" ? <td className="green-text bold">+{this.props.transaction.amount}</td> : <td className="red-text bold">-{this.props.transaction.amount}</td>

    return(
      <tr>
        <td>{getLocalTime(this.props.transaction.created_at)}</td>
        <td>{this.props.transaction.src}</td>
        <td>{this.props.transaction.dest}</td>
        {td}
        <td>{this.props.transaction.status === "IN" ? "收入" : "支出"}</td>
        <td className="text-overflow">{this.props.transaction.memo}</td>
      </tr>
    )
  }
}

export default Transaction;