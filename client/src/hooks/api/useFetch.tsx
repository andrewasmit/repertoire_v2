import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { hydrateEnsembles } from "../../redux/fetchedLibrarySlice";
import { FetchedPiece } from "../../redux/fetchedLibrarySlice";

// const dispatch = useDispatch();

export const fetchData = async (url: string): Promise<FetchedPiece[]>=>{
  const res= await fetch(url)
  const data = await res.json()

  if (res.status === 200){
    // dispatch(hydrateEnsembles(data));
    return data
  } else 
  throw new Error(data.message);
}

export const useFetch = (url: string, key: string)=>{
  const queryFn = useCallback(()=>{
    return fetchData(url)
  }, [url]);

  return useQuery({ 
    queryKey: [`${key}`],
    queryFn,
    retry: 1
  })
};