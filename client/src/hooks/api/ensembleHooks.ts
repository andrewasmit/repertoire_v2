// import { useQuery } from "@tanstack/react-query";
import { Ensemble } from "../../redux/organizationSlice";
// import { useCallback } from "react";
// import { FetchedPiece } from "../../redux/fetchedLibrarySlice";

type EnsembleData = {
  name: string;
  grade_level: string;
  organization_id: number | undefined;
};

export const postNewEnsemble = async (
  newEnsData: EnsembleData
): Promise<Ensemble> => {
  const res = await fetch("/api/ensembles", {
    method: "POST",
    body: JSON.stringify(newEnsData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return data;
  } else throw new Error(data.message);
};

// export const useFetchExternalLibrary = (url: string, key: string) => {
//   const queryFn = useCallback(() => {
//     return fetchData(url);
//   }, [url]);

//   return useQuery({
//     queryKey: [`${key}`],
//     queryFn,
//     retry: 1,
//   });
// };
