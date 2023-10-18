// External Dependencies
import { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetDifficultyOptions, useGetNumberOfPlayerOptions } from './hooks';

// Local Dependencies

// Local Items
interface NewPieceParams{
  handleClose: ()=> void;
}

type Values={
  composer: string;
  difficulty: number;
  genre: string;
  number_of_players: number;
  organization_id: number | undefined;
  reference_recording: string;
  title: string;
}

// Component Definition
const AddNewPieceForm = ({ handleClose }:NewPieceParams) => {

const { organization } = useAppSelector((state) => state.organization);
const difficultyOptions = useGetDifficultyOptions();
const numberOfPlayerOptions = useGetNumberOfPlayerOptions();
const dispatch = useAppDispatch();

const orgId = useMemo((): number | undefined=>{
  if (organization !== null){
    return organization.id
  }
  return undefined;
}, [organization])



  return (
    <div>
      <h1>THIS IS WHERE YOU CAN ADD A NEW PIECE</h1>

      <Formik
        initialValues={{
          composer: "",
          difficulty: 0,
          genre: "",
          number_of_players: 0,
          organization_id: orgId,
          reference_recording: "",
          title: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            console.log("Values before fetch:", values)
            // addNewPieceApi(values)
            // .then(res=>{
            //   console.log("RES: ", res)
            //   // dispatch(addNewEns(res))
            // });
            handleClose();
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="title">Title</label>
          <Field 
            id="title" 
            name="title" 
            placeholder="Title of Piece" 
          />

          <label htmlFor="composer">Composer</label>
          <Field 
            id="composer" 
            name="composer" 
            placeholder="Composer" 
          />

          <label htmlFor="genre"># of Players</label>
          <Field 
            id="number_of_players" 
            name="number_of_players" 
            as="select" 
          >
            <option value={0} disabled selected={true} >** Select Number of Players **</option>
            {numberOfPlayerOptions}
          </Field>

          <label htmlFor="genre">Difficulty</label>
          <Field
            id="difficulty" 
            name="difficulty" 
            as="select"
          >
            <option value={0} disabled selected={true} >** Select Difficulty **</option>
            {difficultyOptions}
          </Field>

          <label htmlFor="genre">Reference Recording</label>
          <Field 
            id="reference_recording" 
            name="reference_recording" 
            placeholder="Link to Reference Recording" 
          />

          <label htmlFor="genre">Genre</label>
          <Field 
            id="genre" 
            name="genre" 
            placeholder="Genre" 
          />

          <button type="submit">Add Piece To Library</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddNewPieceForm;