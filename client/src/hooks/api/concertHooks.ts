// External Dependencies

// Internal Dependencies

// type EnsembleData = {
//   name: string;
//   grade_level: string;
//   organization_id: number | undefined;
// };

// type EnsembleResponse = {
//   id: number;
//   grade_level: string;
//   name: string;
//   organization_id: number;
// };

// export const postNewEnsemble = async (
//   newEnsData: EnsembleData
// ): Promise<EnsembleResponse> => {
//   const res = await fetch("/api/ensembles", {
//     method: "POST",
//     body: JSON.stringify(newEnsData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();

//   if (res.status === 201) {
//     return data;
//   } else throw new Error(data.message);
// };

export const destroyConcert = async (
  concertId: number | string
): Promise<any> => {
  const res = await fetch(`/api/concerts/${concertId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.status === 204) {
    console.log("Concert successfully deleted");
  } else throw new Error(data.message);
};
