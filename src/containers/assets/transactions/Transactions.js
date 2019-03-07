import React from 'react';
import { Row, Col, Card } from 'react-materialize'
import { connect } from 'react-redux';

import { getTransactions } from '../../../actions/transactions_actions';
import { getPaychecks } from '../../../actions/paychecks_actions';
import { setMode } from '../../../actions/mode_action';
import { sortTransactionsByDate } from '../../../ultis';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

class Transactions extends React.Component {

  componentWillMount() {
    this.props.setMode("TRANSACTION_LIST")
    this.props.getTransactions(`?`)
    this.props.getPaychecks(`?paid=${true}`)
  }

  setMode = () => {
    this.props.setMode("TRANSACTION_ADD")
  }

  render() {
    let content = ""

    switch (this.props.mode) {
      case "TRANSACTION_ADD":
        content = <TransactionForm transaction={{}} />
        break;
      case "TRANSACTION_EDIT":
        // content = <TransactionForm transaction={this.props.transaction} />
        break;
      case "TRANSACTION_LIST":
        content = this.props.transactions.length > 0 ? <TransactionList transactions={sortTransactionsByDate(this.props.transactions)} /> : <h6 className="airbnb-font bold">当前没有交易明细</h6>
        break;
      default:
        break;
    }

    let sum = 0
    if(this.props.transactions.length > 0) {
      this.props.transactions.forEach((t, idx) => {
        if(t.status === "IN") sum += t.amount
        else sum -= t.amount
      })
    }

    let header = this.props.mode === "TRANSACTION_LIST" ? 
                <div>
                  <h5 className="airbnb-font bold">总计: <span className={sum > 0 ? "green-text" : "red-text"}>{sum.toFixed(2)}元</span></h5>
                  <br/>
                  <button className="btn" onClick={this.setMode}>增加条目</button>
                  <br/>
                  <br/>
                </div> : ""

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            {header}
            {content}
            <br/>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {

  let _transactions = state.transactionsData.transactions
  let paychecks = []
  state.paycheckData.paychecks.forEach((pc, idx) => {
    if(pc.amount !== 0) {
      paychecks.push({
        src: 'Lighters',
        dest: pc.teacher_id.lastname + pc.teacher_id.firstname,
        amount: pc.amount ? pc.amount.toFixed(2) : 0,
        created_at: pc.updated_at,
        status: "OUT"
      })
    }
  })
  if(paychecks.length > 0) _transactions = [...state.transactionsData.transactions, ...paychecks]

  return {
    auth: state.auth,
    // transaction: state.transactionsData.transaction,
    transactions: _transactions,
    mode: state.mode.value,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setMode: (mode) => {
      dispatch(setMode(mode))
    },
    getTransactions: (query) => {
      dispatch(getTransactions(query))
    },
    getPaychecks: (query) => {
      dispatch(getPaychecks(query))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);