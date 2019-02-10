import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import AdminNewTeacherForm from './AdminNewTeacherForm';
import { addTeacher, updateTeacher } from '../../actions/teachers_actions';

const mapDispatchToProps = dispatch => {
  return {
    addTeacher: (teacher) => dispatch(addTeacher(teacher)),
    updateTeacher: (teacher) => dispatch(updateTeacher(teacher))
  }
};

const AdminTeacherNewWithFormik = connect(null, mapDispatchToProps)(
  withFormik({
    mapPropsToValues: props => ({
      firstname: props.teacher.firstname || "",
      lastname: props.teacher.lastname || "",
      englishname: props.teacher.englishname || "",
      age: props.teacher.age || "",
      birthday: props.teacher.birthday || "",
      gender: props.teacher.gender || "",
      city: props.teacher.city || ""
    }),
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required('此项为必填项!'),
      lastname: Yup.string().required('此项为必填项!'),
      englishname: Yup.string().required('此项为必填项!'),
      age: Yup.string().required('此项为必填项!'),
      birthday: Yup.string().required('此项为必填项!'),
      gender: Yup.string().required('此项为必填项!'),
      city: Yup.string().required('此项为必填项!'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(false);
      props.action === "NEW" ? props.addTeacher(values) : props.updateTeacher(values);
    }
  })(AdminNewTeacherForm)
);

export default AdminTeacherNewWithFormik;