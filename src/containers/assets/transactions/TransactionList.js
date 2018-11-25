import React from 'react';

import Transaction from './Transaction';

class TransactionList extends React.Component {
  render() {
    let transactionList = this.props.transactions.map((transaction, idx) => {
      return <Transaction key={idx} transaction={transaction} />
    })

    let transactionTable = <table>
                            <thead>
                              <tr>
                                <th>时间</th>
                                <th>来源</th>
                                <th>目的地</th>
                                <th>金额(元)</th>
                                <th>状态</th>
                                <th>备忘录</th>
                              </tr>
                            </thead>

                            <tbody>
                              {transactionList}
                            </tbody>
                          </table>

    return(
      <div>
        <h6 className="airbnb-font bold">支出明细列表</h6>
        <hr/>
        {transactionTable}
      </div>
    )
  }
}

export default TransactionList