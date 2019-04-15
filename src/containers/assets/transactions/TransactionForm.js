import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { setMode } from '../../../actions/mode_action'
import { addTransaction } from '../../../actions/transactions_actions';
import { FlashMessage } from '../../../components/FlashMessage'

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid:  false
    }

    this.cancel = this.cancel.bind(this)
  }

  componentDidMount() {
    M.updateTextFields();
    M.AutoInit();
  }

  cancel() {
    this.props.setMode("TRANSACTION_LIST")
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m12">
            <h5 className="airbnb-font bold center">交易明细表单</h5>
            <br/>
            <Formik
              initialValues={{
                src: this.props.transaction.src || '', 
                dest: this.props.transaction.dest || '', 
                amount: this.props.transaction.amount || '',
                memo: this.props.transaction.memo || '',
                status: this.props.transaction.status || 'IN',
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.props.addTransaction(values)
                this.props.setMode("TRANSACTION_LIST")
              }}
              validationSchema={Yup.object().shape({
                src: Yup.string().required('来源不能为空'),
                dest: Yup.string().required('目的地不能为空'),
                amount: Yup.number().required('金额不能为空')
              })}
            >
              {props => {
                const {
                  touched,
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    {errors.src && touched.src && <FlashMessage props={{status: "error", msg: errors.src}} />}
                    {errors.dest && touched.dest && <FlashMessage props={{status: "error", msg: errors.dest}} />}
                    {errors.status && touched.status && <FlashMessage props={{status: "error", msg: errors.status}} />}
                    {errors.dest && touched.dest && <FlashMessage props={{status: "error", msg: errors.dest}} />}
                    {errors.amount && touched.amount && <FlashMessage props={{status: "error", msg: errors.amount}} />}

                    <div className="row no-margin">
                      <div className="input-field col m12 s12">
                        <select 
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value='IN'>收入</option>
                          <option value='OUT'>支出</option>
                        </select>
                        <label>支出或收入</label>
                      </div>
                    </div>

                    <div className="row no-margin">
                      <div className="input-field col s12 m6">
                        <input 
                          type="text"
                          name="src" 
                          id="src"
                          className="validate"
                          onChange={handleChange} 
                          onBlur={handleBlur} 
                          value={values.src} 
                        />
                        <label htmlFor="src">从 <span className="required">*</span></label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input 
                          type="text"
                          name="dest" 
                          id="dest" 
                          className="validate"
                          onChange={handleChange} 
                          onBlur={handleBlur} 
                          value={values.dest} 
                        />
                        <label htmlFor="dest">到 <span className="required">*</span></label>
                      </div>
                    </div>

                    <div className="row no-margin">
                      <div className="input-field col m12 s12">
                        <input 
                          type="number" 
                          name="amount" 
                          id="amount" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.amount}
                        />
                        <label htmlFor="amount">金额(元) <span className="required">*</span></label>
                      </div>
                    </div>

                    <div className="row no-margin">
                      <div className="input-field col m12 s12">
                        <input 
                          type="text" 
                          name="memo" 
                          id="memo" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="validate"
                          value={values.memo} 
                        />
                        <label htmlFor="memo">备忘录</label>
                      </div>
                    </div>

                    <br/>
                    <div className="row no-margin">
                      <div className="input-field col m6 s12">
                        <button type="submit" className="btn">添加</button>
                      </div>
                      <div className="input-field col m6 s12">
                        <button className="btn white black-text right" onClick={this.cancel}>取消</button>
                      </div>
                    </div>

                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (transaction) => {
      dispatch(addTransaction(transaction))
    },
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);