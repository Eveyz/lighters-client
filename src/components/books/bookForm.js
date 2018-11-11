import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const BookForm = props => {
  const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
  } = props;
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="lightersLevel" 
                id="lightersLevel" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.lightersLevel} 
              />
              <label htmlFor="lightersLevel">Lighters Level</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="americanGrade" 
                id="americanGrade" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.americanGrade} 
              />
              <label htmlFor="americanGrade">American Grade</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="razLevel" 
                id="razLevel" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.razLevel} 
              />
              <label htmlFor="razLevel">RAZ Level</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="lexileLevel" 
                id="lexileLevel" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.lexileLevel} 
              />
              <label htmlFor="lexileLevel">Lexile Level</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="age" 
                id="age" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.age} 
              />
              <label htmlFor="age">Age</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="category" 
                id="category" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.category} 
              />
              <label htmlFor="category">Category</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="serials" 
                id="serials" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.serials} 
              />
              <label htmlFor="serials">Serials</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="name" 
                id="name" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.name} 
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input 
                type="text"
                name="audioLink" 
                id="audioLink" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.audioLink} 
              />
              <label htmlFor="audioLink">Audio Link</label>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default BookForm;