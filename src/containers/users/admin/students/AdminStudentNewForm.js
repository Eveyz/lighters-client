import React from 'react';
import { Link } from 'react-router-dom';

const AdminStudentNewForm = props => {
  const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
  } = props;
  const buttonColor = isSubmitting ? "#bdc3c7" : "#2ecc71";
  const buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"};

  return (
    <form onSubmit={handleSubmit}>
      <div className="row no-margin">
        <div className="input-field col s12 m6">
          <input 
            type="text"
            name="lastname" 
            id="lastname" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.lastname} 
          />
          <label htmlFor="lastname">姓</label>
        </div>
        <div className="input-field col s12 m6">
          <input 
            type="text"
            name="firstname" 
            id="firstname"
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.firstname} 
          />
          <label htmlFor="firstname">名</label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="englishname" 
            id="englishname" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.englishname} 
          />
          {errors.englishname &&
            touched.englishname && (
              <div className="inline-form-error-msg">
                {errors.englishname}
              </div>
            )}
          <label htmlFor="englishname">英文名字 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="number"
            name="age" 
            id="age" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.age} 
          />
          <label htmlFor="age">年龄</label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="col s12 m12">
          <label htmlFor="birthday">出生日期</label>
          <input
            type="date"
            name="birthday" 
            id="birthday" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.birthday} 
          />
        </div>
      </div>
      <br/>
      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <select 
            name="gender"
            value={values.gender}
            className="validate"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value='女'>女</option>
            <option value='男'>男</option>
          </select>
          <label>性别 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="city" 
            id="city" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.city} 
          />
          {errors.city &&
            touched.city && (
              <div className="inline-form-error-msg">
                {errors.city}
              </div>
            )}
          <label htmlFor="city">所在城市 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field">
          <button 
            disabled={isSubmitting} 
            className="col m12 s12" 
            style={buttonStyle}
            type="submit"
          >
            <span style={{color: "white", fontSize: "20px"}}><b>提交</b></span>
          </button>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field">
          <Link 
            className="col m12 s12 white r-box-shadow" 
            to={`/admin/students/all`}
            style={
              {padding: "11px 0px 11px 0px", borderRadius: "15px", border: "none", cursor: "pointer"}
            }
          >
            <span className="center" style={{color: "black", fontSize: "20px"}}><b>返回</b></span>
          </Link>
        </div>
      </div>

    </form>
  )
}

export default AdminStudentNewForm;