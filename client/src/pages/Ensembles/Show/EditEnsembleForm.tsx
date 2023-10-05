// External Dependencies
import { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
// import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { 
  // useAppDispatch, 
  useAppSelector } from '../../../redux/hooks';
import { editEnsemble } from '../../../hooks/api/ensembleHooks';

// Local Dependencies

// Local Items
type Values={
  grade_level: string;
  name: string;
  organization_id: number | undefined;
  ensemble_id?: number;
}

interface EditFormParams{
  name: string;
  gradeLevel: string;
  ensembleId: number;
}


// Component Definition
const EditEnsembleForm = ({ name, gradeLevel, ensembleId }: EditFormParams) => {

const { organization } = useAppSelector((state) => state.organization);

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization])

  return (
    <div>
      <h2>Edit Ensemble Details</h2>

      <Formik
        initialValues={{
          grade_level: gradeLevel,
          name: name,
          ensemble_id: ensembleId,
          organization_id: orgId
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            editEnsemble(values)
            .then(res=>console.log("RESPONSE: ", res));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="username">Ensemble Name: </label>
          <Field 
            id="name" 
            name="name" 
            placeholder="Name of Ensemble" 
          />

          <label htmlFor="password">Grade Level: </label>
          <Field 
            id="gradeLevel" 
            name="grade_level" 
            placeholder="Grade Level" 
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditEnsembleForm;