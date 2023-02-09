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

const FormikComponent = () => {
  return (
    <Formik
    initialValues={{ name: '', surname: '', dateOfBirth: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
      }}
      validateOnBlur={false}>
      {({ touched, errors, values, handleBlur, setFieldTouched, setFieldValue }: FormikProps<FormInterface>) => {

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
          setFieldTouched(field, true, false);
          setFieldValue(field, event.target.value);
        };

        return (
          <Form>
            <h2>Formik</h2>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={touched.name && errors.name ? 'danger' : ''}
              onChange={(e: any) => handleChange(e, 'name')}
              onBlur={handleBlur} />
            <ErrorMessage name="name" component="div" className='error-message' />
            <Field
              type="text"
              name="surname"
              placeholder="Surname"
              className={touched.surname && errors.surname ? 'danger' : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'surname')}
              onBlur={handleBlur} />
            <ErrorMessage name="surname" component="div" className='error-message' />
            <Field
              type="date"
              name="dateOfBirth"
              className={touched.dateOfBirth && errors.dateOfBirth ? 'danger' : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'dateOfBirth')}
              onBlur={handleBlur} />
            <ErrorMessage name="date" component="div" className='error-message' />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={touched.email && errors.email ? 'danger' : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
              onBlur={handleBlur} />
            <ErrorMessage name="email" component="div" className='error-message' />
            <button type="submit" disabled={Object.values(values).some(x => !x) || Object.values(errors).some(x => x)}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikComponent;