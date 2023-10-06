// External Dependencies
import { useCallback, useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addNewConcert } from '../../../redux/organizationSlice';
import { postNewConcert } from '../../../hooks/api/concertHooks';


// Local Items
type Values={
  title: string;
  year: string;
  organization_id: number | undefined;
}

// Component Definition
const NewConcertForm = () => {

const { organization } = useAppSelector((state) => state.organization);
const dispatch = useAppDispatch();
const navigate = useNavigate();

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization]);

const handleNavigateBack = useCallback(()=>{
  navigate('/concerts');
}, []);

  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW CONCERT</h1>
      <button onClick={handleNavigateBack}>Discard New Concert</button>

      <Formik
        initialValues={{
          year: '',
          title: '',
          organization_id: orgId
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            postNewConcert(values)
            .then(res=>{
              dispatch(addNewConcert(res))
              handleNavigateBack();
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="username">Title of Concert</label>
          <Field 
            id="title" 
            name="title" 
            // placeholder="Name of Concert" 
          />

          <label htmlFor="password">Year</label>
          <Field 
            id="year" 
            name="year" 
            // placeholder="Year" 
          />

          <button type="submit">Create New Concert</button>
        </Form>
      </Formik>
    </div>
  )
}

export default NewConcertForm