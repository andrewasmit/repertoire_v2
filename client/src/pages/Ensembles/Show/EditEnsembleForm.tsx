// External Dependencies
import { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { editEnsemble } from '../../../hooks/api/ensembleHooks';
import { editEns } from '../../../redux/organizationSlice';
import { FormikTextInput } from '../../../components/Formik';
import { Button, Typography } from '@mui/material';

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
  handleCloseForm: ()=> void;
}

// Component Definition
const EditEnsembleForm = ({ name, gradeLevel, ensembleId, handleCloseForm }: EditFormParams) => {

const { organization } = useAppSelector((state) => state.organization);

const dispatch = useAppDispatch();

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined
}, [organization])

  return (
    <div>
      <Typography 
        variant='h4' 
        color='primary' 
        sx={{ 
          backgroundColor: '#e4cec5', 
          opacity: .7, 
          width: '450px', 
          display: 'inline-block',
          marginTop: 1
        }} 
      >
        Edit Ensemble Details
      </Typography>

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
            .then(res=>{
              dispatch(editEns(res))
              handleCloseForm();
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <FormikTextInput 
            name='name'
            label="Name Of Ensemble"
            type="text"
          />

          <FormikTextInput 
            name='grade_level'
            label="Grade Level"
            type="text"
          />

          <Button 
            variant='contained' 
            color='secondary' 
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditEnsembleForm;