import React from 'react';
import { Link } from 'react-router-dom';

import { FlashMessage } from '../../components/FlashMessage';

const TeacherForm = props => {
  const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
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
            name="firstname" 
            id="firstname"
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.firstname} 
          />
          {errors.firstname &&
            touched.firstname && (
              <div className="inline-form-error-msg">
                {errors.firstname}
              </div>
            )}
          <label htmlFor="firstname">姓 <span className="required">*</span></label>
        </div>
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
          {errors.lastname &&
          touched.lastname && (
            <div className="inline-form-error-msg">
              {errors.lastname}
            </div>
          )}
          <label htmlFor="lastname">名 <span className="required">*</span></label>
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
          {errors.age &&
            touched.age && (
              <div className="inline-form-error-msg">
                {errors.age}
              </div>
            )}
          <label htmlFor="age">年龄 <span className="required">*</span></label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="date"
            name="birthday" 
            id="birthday" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.birthday} 
          />
          {errors.birthday &&
            touched.birthday && (
              <div className="inline-form-error-msg">
                {errors.birthday}
              </div>
            )}
          <label htmlFor="birthday">出生日期 <span className="required">*</span></label>
        </div>
      </div>
      
      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <select 
            name="gender"
            value={values.gender}
            className="validate"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value='female'>女</option>
            <option value='male'>男</option>
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
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="work" 
            id="work" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.work} 
          />
          {errors.work &&
            touched.work && (
              <div className="inline-form-error-msg">
                {errors.work}
              </div>
            )}
          <label htmlFor="work">当前工作状态 <span className="required">*</span></label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="education" 
            id="education" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.education} 
          />
          {errors.education &&
            touched.education && (
              <div className="inline-form-error-msg">
                {errors.education}
              </div>
            )}
          <label htmlFor="education">教育背景 <span className="required">*</span></label>
        </div>
      </div>
      
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <textarea
            type="text"
            name="experience" 
            id="experience" 
            className="materialize-textarea validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.experience} 
          />
          {errors.experience &&
            touched.experience && (
              <div className="inline-form-error-msg">
                {errors.experience}
              </div>
            )}
          <label htmlFor="experience">与教师/家教相关的工作经历 <span className="required">*</span></label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <textarea 
            type="text"
            name="otherexperience" 
            id="otherexperience" 
            className="materialize-textarea validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.otherexperience} 
          />
          {errors.otherexperience &&
            touched.otherexperience && (
              <div className="inline-form-error-msg">
                {errors.otherexperience}
              </div>
            )}
          <label htmlFor="otherexperience">其他工作经历</label>
        </div>
      </div>


      <br/>
      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>英语水平: (请上传对应的证书)</h5>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="profour" 
            id="profour" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.profour} 
          />
          {errors.profour &&
            touched.profour && (
              <div className="inline-form-error-msg">
                {errors.profour}
              </div>
            )}
          <label htmlFor="profour">英语专业四级 (分数)</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="proeight" 
            id="proeight" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.proeight} 
          />
          {errors.proeight &&
            touched.proeight && (
              <div className="inline-form-error-msg">
                {errors.proeight}
              </div>
            )}
          <label htmlFor="proeight">英语专业八级 (分数)</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="levelsix" 
            id="levelsix" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.levelsix} 
          />
          {errors.levelsix &&
            touched.levelsix && (
              <div className="inline-form-error-msg">
                {errors.levelsix}
              </div>
            )}
          <label htmlFor="levelsix">大学英语六级 (分数)</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <textarea 
            type="text"
            name="other" 
            id="other" 
            className="materialize-textarea validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.other} 
          />
          {errors.other &&
            touched.other && (
              <div className="inline-form-error-msg">
                {errors.other}
              </div>
            )}
          <label htmlFor="other">其他英语等级测试(托福, 雅思等) (分数)</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="honor" 
            id="honor" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.honor} 
          />
          {errors.honor &&
            touched.honor && (
              <div className="inline-form-error-msg">
                {errors.honor}
              </div>
            )}
          <label htmlFor="honor">证明英语能力的荣誉</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="file-field input-field col m12 s12">
          <div className="btn cyan">
            <span>上传上述所填写证书</span>
            <input id="certificates" name="certificates" type="file" onChange={(event) => {
              setFieldValue("certificates", event.currentTarget.files[0]);
            }} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          {errors.file &&
            touched.file && (
              <div className="inline-form-error-msg">
                {errors.file}
              </div>
            )}
        </div>
      </div>

      <br/>
      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>兴趣特长:</h5>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <textarea 
            type="text"
            name="interaction" 
            id="interaction" 
            className="materialize-textarea validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.interaction} 
          />
          {errors.interaction &&
            touched.interaction && (
              <div className="inline-form-error-msg">
                {errors.interaction}
              </div>
            )}
          <label htmlFor="interaction">有与学龄儿童互动的经验吗 (包括自己的弟妹) <span className="required">*</span></label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="like" 
            id="like" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.like} 
          />
          {errors.like &&
            touched.like && (
              <div className="inline-form-error-msg">
                {errors.like}
              </div>
            )}
          <label htmlFor="like">是否喜欢英文原著阅读 <span className="required">*</span></label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="availabletime" 
            id="availabletime" 
            className="validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.availabletime} 
          />
          {errors.availabletime &&
            touched.availabletime && (
              <div className="inline-form-error-msg">
                {errors.availabletime}
              </div>
            )}
          <label htmlFor="availabletime">每周可保证几个小时线上教学时间 <span className="required">*</span></label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="file-field input-field col m12 s12">
          <div className="btn cyan">
            <span>story录音</span>
            <input id="story" name="story" type="file" onChange={(event) => {
              setFieldValue("story", event.currentTarget.files[0]);
            }} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          {errors.file &&
            touched.file && (
              <div className="inline-form-error-msg">
                {errors.file}
              </div>
            )}
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <textarea 
            type="text"
            name="comments" 
            id="comments" 
            className="materialize-textarea validate"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.comments} 
          />
          {errors.comments &&
            touched.comments && (
              <div className="inline-form-error-msg">
                {errors.comments}
              </div>
            )}
          <label htmlFor="comments">对英语(远程线上)教育和英文原版阅读的见解, 以及为何对我们的教学平台感兴趣 (请用英文填写, 不少于300字) <span className="required">*</span></label>
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
            to={"/books"}
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

export default TeacherForm;