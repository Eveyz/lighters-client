import React from 'react';

class Transaction extends React.Component {
  render() {
    let td = this.props.transaction.status === "IN" ? <td className="green-text bold">+{this.props.transaction.amount}</td> : <td className="red-text bold">-{this.props.transaction.amount}</td>

    let date = new Date(this.props.transaction.created_at)

    return(
      <tr>
        <td>{date.toUTCString()}</td>
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