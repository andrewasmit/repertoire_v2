// External Dependencies
import { FC } from 'react'

// Internal Dependencies
import '../ensembles.css'

interface EnsembleCardProps{
  id: number,
  name: string,
  grade: string
}

const EnsembleCard: FC<EnsembleCardProps> = ({
  name, grade
})=>{

  return (
    <div className='ens-card'>
      <h3>{name}</h3>
      <h4>{grade}th grade</h4>
    </div>
  )
}

export default EnsembleCard