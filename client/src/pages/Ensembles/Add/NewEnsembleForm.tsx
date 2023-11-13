// External Dependencies
import { useCallback, useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Button, ButtonGroup, Typography } from '@mui/material';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postNewEnsemble } from '../../../hooks/api/ensembleHooks';
import { addNewEns } from '../../../redux/organizationSlice';
import { FormikTextInput } from '../../../components/Formik';


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
      <Typography variant='h3'>Add a New Ensemble</Typography>

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
            handleNavigateBack();
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          grade_level: Yup.string()
            .required('Required')
        })}
      >
        <Form className='form'>
          <FormikTextInput 
            name='name'
            label="Name Of Ensemble"
            type="text"
          />

          <FormikTextInput 
            name='grade_level'
            label="Grade Level of Ensemble"
            type="text"
          />
          
          <ButtonGroup sx={{ marginTop: 2.5 }}>
            <Button color='primary' variant='text' onClick={handleNavigateBack}>Discard New Ensemble</Button>
            <Button variant='contained' type="submit" >Create New Ensemble</Button>
          </ButtonGroup>
        </Form>
      </Formik>
    </div>
  )
}

export default NewEnsembleForm