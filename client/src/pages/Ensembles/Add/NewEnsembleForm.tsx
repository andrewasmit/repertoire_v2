// External Dependencies
// import { FC } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppSelector } from '../../../redux/hooks';
import { useMemo } from 'react';

// Local Dependencies

// Local Items
type Values={
  grade_level: string;
  name: string;
  organization_id: number | undefined;
}

// Component Definition
const NewEnsembleForm = () => {

const { organization } = useAppSelector((state) => state.organization);

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization])

  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW ENSEMBLE</h1>

      <Formik
        initialValues={{
          grade_level: '',
          name: '',
          organization_id: orgId
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