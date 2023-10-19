// External Dependencies

// Internal Dependencies
import { ConcertResponse } from "../../redux/organizationSlice";

type PieceData = {
  composer: string;
  difficulty: string | number;
  genre: string;
  number_of_players: string | number;
  organization_id: number | undefined;
  reference_recording: string;
  title: string;
};

export const addNewPieceApi = async (
  newPieceData: PieceData
): Promise<ConcertResponse> => {
  const res = await fetch("/api/pieces", {
    method: "POST",
    body: JSON.stringify(newPieceData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return data;
  } else throw new Error(data.message);
};

// export const destroyConcert = async (
//   concertId: number | string
// ): Promise<any> => {
//   const res = await fetch(`/api/concerts/${concertId}`, {
//     method: "DELETE",
//   });

//   const data = await res.json();

//   if (res.status === 204) {
//     console.log("Concert successfully deleted");
//   } else throw new Error(data.message);
// };

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
