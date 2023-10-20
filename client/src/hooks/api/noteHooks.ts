// External Dependencies

// Internal Dependencies
import { Note } from "../../redux/organizationSlice";

type NoteData = {
  note: string;
  piece_id: string | number;
  user_id: string | number;
};

export const addNewNoteApi = async (newNoteData: NoteData): Promise<Note> => {
  const res = await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(newNoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return data;
  } else throw new Error(data.message);
};

export const destroyNote = async (noteId: number | string): Promise<any> => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.status === 204) {
    console.log("Note successfully deleted");
  } else throw new Error(data.message);
};

// export const editConcert = async (
//   updatedConcertData: ConcertData
// ): Promise<ConcertResponse> => {
//   const res = await fetch(`/api/concerts/${updatedConcertData.concert_id}`, {
//     method: "PATCH",
//     body: JSON.stringify(updatedConcertData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();

//   if (res.status === 200) {
//     return data;
//   } else throw new Error(data.message);
// };
