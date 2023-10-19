// External Dependencies


// Internal Dependencies
import { useMemo } from "react"
import { Note } from "../../../redux/organizationSlice"
import { useAppSelector } from "../../../redux/hooks"


function NoteCard({ id, piece_id, user_id, note }: Note) {

  const { users } = useAppSelector(state=>state.organization);
  const { currentUser } = useAppSelector(state=>state.user);

  const author = useMemo(()=>{
    if(user_id === currentUser?.id){
      return currentUser?.username
    } 
    return users?.filter(user=>user.id === user_id)[0].username
  },[users, user_id]);


  return (
    <div>
      <h2>{note}</h2>
      <h3>-{author}</h3>
    </div>
  )
}

export default NoteCard