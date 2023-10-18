// External Dependencies
import { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

// Internal Dependencies
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addPerformance } from '../../../redux/organizationSlice';
import { addPerformanceApi } from '../../../hooks/api/performanceHooks';


// Local Items
type Values={
  concert_id: number | string | undefined;
  piece_id: string | undefined;
  ensemble_id: string | undefined;
}

interface AddPerformanceParams{
  concertId: number | string;
  handleCloseForm: ()=> void;
}

// Component Definition
const AddPerformanceForm = ({ concertId, handleCloseForm }: AddPerformanceParams) => {

const { ensembles, library } = useAppSelector((state) => state.organization);
const dispatch = useAppDispatch();

const pieceSelectOptions = useMemo(()=>{
  return library?.map(piece=>{
    return <option value={piece.id} key={piece.id} >
              "{piece.title}" By: {piece.composer}
            </option>
  })
}, [library])

const ensembleSelectOptions = useMemo(()=>{
  return ensembles?.map(ensemble=>{
    return <option value={ensemble.id} key={ensemble.id} >
              {ensemble.name}
            </option>
  })
}, [ensembles])


  return (
    <div>
      <h2>Add Performance to Concert</h2>

      <Formik
        initialValues={{
          concert_id: concertId,
          piece_id: undefined,
          ensemble_id: undefined,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            console.log("VALUES BEFORE FETCH: ", values);
            addPerformanceApi(values)
            .then(res=>{
              console.log("RES: ", res)
              dispatch(addPerformance(res))
              handleCloseForm();
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="piece">Piece: </label>
          <Field as="select" name="piece_id" id="piece">
            <option value={undefined} disabled selected={true} >** Select Piece **</option>
            {pieceSelectOptions}
          </Field>

          <label htmlFor="ensemble">Ensemble: </label>
          <Field as="select" name="ensemble_id" id="ensemble">
            <option value={undefined} disabled selected={true} >** Select Ensemble **</option>
            {ensembleSelectOptions}
          </Field>

          <button type="submit">Add Performance</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddPerformanceForm;