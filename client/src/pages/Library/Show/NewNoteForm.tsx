// External Dependencies
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppDispatch } from '../../../redux/hooks';
import { Button } from '@mui/material';
import { addNewNoteApi } from '../../../hooks/api/noteHooks';
import { addNoteToPiece } from '../../../redux/organizationSlice';

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
            addNewNoteApi(values)
            .then(res=>{
              dispatch(addNoteToPiece(res));
            });
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