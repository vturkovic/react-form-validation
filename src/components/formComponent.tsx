import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormInterface } from '../interfaces';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  surname: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const FormComponent = () => {
  return (
    <Formik
    initialValues={{ name: '', surname: '', dateOfBirth: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
      }}
      validateOnBlur={false}>
      {({ isSubmitting, touched, errors }: FormikProps<FormInterface>) => (
        <Form>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            className={touched.name && errors.name ? 'danger' : ''}/>
          <ErrorMessage name="name" component="div" />
          <Field
            type="text"
            name="surname"
            placeholder="Surname"
            className={touched.surname && errors.surname ? 'danger' : ''}/>
          <ErrorMessage name="surname" component="div" />
          <Field
            type="date"
            name="dateOfBirth"
            className={touched.dateOfBirth && errors.dateOfBirth ? 'danger' : ''}/>
          <ErrorMessage name="dateOfBirth" component="div" />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={touched.email && errors.email ? 'danger' : ''}/>
          <ErrorMessage name="email" component="div" />
          <button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;