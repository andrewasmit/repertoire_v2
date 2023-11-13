// External Dependencies
import { useCallback, useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

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

interface NewEnsParams {
  isOpen: boolean;
  handleClose: ()=> void;
}

// Component Definition
const NewEnsembleForm = ({
  isOpen, 
  handleClose, 
}: NewEnsParams) => {

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
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Add a New Ensemble
          </DialogTitle>

          <DialogContent >
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
            </Form>
          </DialogContent>

          <DialogActions>
            <Button color='primary' variant='text' onClick={handleClose}>Discard New Ensemble</Button>
            <Button variant='contained' type="submit" >Create New Ensemble</Button>
          </DialogActions>
      </Dialog>
    </Formik>
  )
}

export default NewEnsembleForm