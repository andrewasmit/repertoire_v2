// External Dependencies
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import '../ensembles.css'


interface EnsembleCardProps{
  id: number,
  name: string,
  grade: string
}

const EnsembleCard: FC<EnsembleCardProps> = ({
  name, grade, id
})=>{

  const navigate = useNavigate();

  const handleNavToShowPage = useCallback(()=>{
    navigate(`/ensembles/${id}`)
  }, [id]);
  

  return (
    <div className='ens-card' onClick={handleNavToShowPage}>
      <h3>{name}</h3>
      <h4>{grade}th grade</h4>
    </div>
  )
}

export default EnsembleCard