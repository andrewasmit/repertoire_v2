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

const backgroundStyles = { 
  backgroundColor: '#143b38', 
  opacity: '0.8',
}

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
          handleClose();
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
          <DialogTitle 
            id="alert-dialog-title" 
            sx={ {
              ...backgroundStyles, 
              color: '#d7ea21',
              textAlign: 'center',
              fontWeight: 'bold', 
              fontSize: 40
              }} 
          >
            Add a New Ensemble
          </DialogTitle>

          <Form className='form'>
            <DialogContent sx={{ ...backgroundStyles, backgroundColor: '#e4cec5' }}>
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
            </DialogContent>

            <DialogActions sx={{ ...backgroundStyles, paddingBottom: 2.5, paddingTop: 2 }} >
              <Button 
                color='secondary' 
                variant='text' 
                onClick={handleClose}
              >
                Discard New Ensemble
              </Button>
              <Button 
                variant='contained' 
                color='secondary' 
                type="submit" 
              >
                Create New Ensemble
              </Button>
            </DialogActions>
          </Form>

      </Dialog>
    </Formik>
  )
}

export default NewEnsembleForm