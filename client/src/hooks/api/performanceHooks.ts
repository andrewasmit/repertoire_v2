// External Dependencies
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// Internal Dependencies
// import { Ensemble } from "../../redux/organizationSlice";

// type EnsembleData = {
//   name: string;
//   grade_level: string;
//   organization_id: number | undefined;
//   ensemble_id?: number;
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

export const deletePerformanceApi = async (
  performanceId: number | string
): Promise<any> => {
  const res = await fetch(`/api/performances/${performanceId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log("RES:", data);

  if (res.status === 204) {
    console.log("Performance successfully deleted");
  } else throw new Error(data.message);
};

// export const editEnsemble = async (
//   newEnsData: EnsembleData
// ): Promise<EnsembleResponse> => {
//   const res = await fetch(`/api/ensembles/${newEnsData.ensemble_id}`, {
//     method: "PATCH",
//     body: JSON.stringify(newEnsData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();

//   if (res.status === 200) {
//     return data;
//   } else throw new Error(data.message);
// };
