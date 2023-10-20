// External Dependencies
import { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useGetDifficultyOptions, useGetNumberOfPlayerOptions } from './hooks';
import { addNewPieceApi } from '../../hooks/api/libraryHooks';
import { addPieceToLibrary } from '../../redux/organizationSlice';
import { Button, TextField } from '@mui/material';

// Local Dependencies

// Local Items
interface NewPieceParams{
  pieceId: number;
  userID: number | undefined;
  handleClose: ()=> void;
}

type Values={
  note: string;
  piece_id: number | string;
  user_id: number | string;
}

// Component Definition
const AddNewNoteForm = ({ handleClose, pieceId, userID }:NewPieceParams) => {

// const { organization } = useAppSelector((state) => state.organization);
const dispatch = useAppDispatch();


  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW NOTE ABOUT A PIECE</h1>

      <Formik
        initialValues={{
          note: "",
          user_id: userID,
          piece_id: pieceId,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            console.log("VALUES BEFORE FETCH: ", values)
            // addNewPieceApi(values)
            // .then(res=>{
            //   dispatch(addPieceToLibrary(res))
            // });
            handleClose();
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="title">Note</label>
          <Field 
            id="note" 
            name="note" 
            placeholder="Note" 
          />

          <Button type="submit" variant='contained'>Add Note</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddNewNoteForm;