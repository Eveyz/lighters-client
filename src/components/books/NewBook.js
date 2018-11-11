import React from 'react';
import { withFormik } from 'formik';

import BookForm from './bookForm';

const NewBookContainer = withFormik({
  mapPropsToValues({}) {
    return {
      lightersLevel: "",
      americanGrade: "",
      razLevel: "",
      lexileLevel: "",
      age: "",
      category: "",
      serials: "",
      name: "",
      audioLink: "",
      file: "",
    }
  },
  handleSubmit: (values) => {
    console.log(values);
  },
  handleChange(e) {
    console.log(e.target.value);
  }
})(BookForm)

class NewBook extends React.Component {
  render() {
    return(
      <div>
        <NewBookContainer />
      </div>
    )
  }
}

export default NewBook;