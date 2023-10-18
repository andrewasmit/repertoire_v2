// External Dependencies
import { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
// import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { editConcert } from '../../../hooks/api/concertHooks';
import { updateConcert } from '../../../redux/organizationSlice';


// Local Items
type Values={
  year: string | number;
  title: string;
  organization_id: number | undefined;
  concert_id: number | string;
}

interface EditFormParams{
  title: string;
  year: string | number;  
  concertId: number | string;
  handleCloseForm: ()=> void;
}


// Component Definition
const EditConcertForm = ({ title, concertId, year, handleCloseForm }: EditFormParams) => {

const { organization } = useAppSelector((state) => state.organization);

const dispatch = useAppDispatch();
// const navigate = useNavigate();

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization])

  return (
    <div>
      <h2>Edit Concert Details</h2>

      <Formik
        initialValues={{
          year: year,
          title: title,
          concert_id: concertId,
          organization_id: orgId
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            editConcert(values)
            .then(res=>{
              dispatch(updateConcert(res))
              handleCloseForm();
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="username">Concert Title: </label>
          <Field 
            id="title" 
            name="title" 
            placeholder="Title of Concert" 
          />

          <label htmlFor="password">Year: </label>
          <Field 
            id="year" 
            name="year" 
            placeholder="Year" 
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditConcertForm;