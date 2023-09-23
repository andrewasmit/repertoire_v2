// External Dependencies
// import { FC } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies

// Local Dependencies

// Local Items
type Values={
  grade_level: string;
  name: string;
}

// Component Definition
const NewEnsembleForm = () => {
  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW ENSEMBLE</h1>

      <Formik
        initialValues={{
          grade_level: '',
          name: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            // handleSubmitSignIn(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          {/* <label htmlFor="username">Username</label> */}
          <Field 
            id="name" 
            name="name" 
            placeholder="Name of Ensemble" 
          />

          {/* <label htmlFor="password">Password</label> */}
          <Field 
            id="gradeLevel" 
            name="grade_level" 
            placeholder="Grade Level" 
          />

          <button type="submit">Create New Ensemble</button>

        </Form>
      </Formik>
    </div>
  )
}

export default NewEnsembleForm