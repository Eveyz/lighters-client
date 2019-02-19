import React from 'react';

const TeacherForm = props => {
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
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="username" 
            id="username" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.username} 
          />
          {errors.username &&
            touched.username && (
              <div className="inline-form-error-msg">
                {errors.username}
              </div>
            )}
          <label htmlFor="username">填写新的用户名 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="password"
            name="password" 
            id="password" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.password} 
          />
          {errors.password &&
            touched.password && (
              <div className="inline-form-error-msg">
                {errors.password}
              </div>
            )}
          <label htmlFor="password">填写新的密码 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="password"
            name="passwordCon" 
            id="passwordCon" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.passwordCon} 
          />
          {errors.passwordCon &&
            touched.passwordCon && (
              <div className="inline-form-error-msg">
                {errors.passwordCon}
              </div>
            )}
          <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
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
            <span style={{color: "white", fontSize: "20px"}}><b>激活</b></span>
          </button>
        </div>
      </div>

    </form>
  )
}

export default TeacherForm;