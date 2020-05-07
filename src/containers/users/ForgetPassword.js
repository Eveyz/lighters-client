import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import { FlashMessage } from '../../components/FlashMessage'
import Background from '../../images/bg.png'

const ForgetPassword = props => {

  const [valid, setValid] = useState(false)

  const submit = (values) => {
    axios.post(`/users/send_reset_password_email`, values)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const bg_style = {
    minHeight: "700px",
    background: "url(" + Background + ") no-repeat", 
    backgroundSize: "cover"
  }

  return (
    <div>
      <Header />
      <div className="" style={bg_style}>
        <div className="container">
          <br/>
          <br/>
          <div className="row no-margin">
            <div className="col s12 m8 offset-m2">
              <div className="card r-box-shadow">
                <div className="card-content">
                  <div className="row">
                    <div className="col s12 m10 offset-m1">
                      <h4 className="center">忘记密码</h4>
                      <br/>
                      <Formik
                        initialValues={{ username: '', email: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                          submit(values);
                        }}
                        validationSchema={Yup.object().shape({
                          username: Yup.string().required('用户名不能为空'),
                          email: Yup.string().email().required('邮箱不能为空'),
                        })}
                      >
                        {props => {
                          const {
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                          } = props;

                          errors.username === undefined && touched.username && errors.email === undefined && touched.email ? setValid(true) : setValid(false)
                          
                          return (
                            <form onSubmit={handleSubmit}>
                              {errors.username && touched.username && <FlashMessage props={{status: "error", msg: errors.username}} />}
                              {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    autoComplete="true"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                  />
                                  <label htmlFor="username">用户名 <span className="required">*</span></label>
                                </div>
                              </div>

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="text" 
                                    name="email" 
                                    id="email"
                                    autoComplete="false" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                  />
                                  <label htmlFor="email">邮箱 <span className="required">*</span></label>
                                </div>
                              </div>

                              <br/>
                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <button type="submit" disabled={!valid} className="btn cyan">提交</button>
                                </div>
                              </div>

                            </form>
                          );
                        }}
                      </Formik>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default ForgetPassword