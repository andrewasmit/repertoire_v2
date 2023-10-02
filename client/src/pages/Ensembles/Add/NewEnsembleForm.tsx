// External Dependencies
import { useCallback, useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postNewEnsemble } from '../../../hooks/api/ensembleHooks';
import { addNewEns } from '../../../redux/organizationSlice';

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
const dispatch = useAppDispatch();
const navigate = useNavigate();

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization])

const handleNavigateBack = useCallback(()=>{
  navigate('/ensembles');
}, []);

  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW ENSEMBLE</h1>
      <button onClick={handleNavigateBack}>EXIT</button>

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
            postNewEnsemble(values)
            .then(res=>dispatch(addNewEns(res)));
            
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