import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react";

export const fetchData = async (url: string): Promise<{}>=>{
  return await fetch(url)
  .then(res=> {
    return res.json()
  })
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