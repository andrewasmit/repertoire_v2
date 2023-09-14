import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ConcertProgram } from "../../redux/organizationSlice";

export const fetchData = async (url: string): Promise<ConcertProgram[]> => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else throw new Error(data.message);
};

export const useFetchOrganizationConcerts = (url: string, key: string) => {
  const queryFn = useCallback(() => {
    return fetchData(url);
  }, [url]);

  return useQuery({
    queryKey: [`${key}`],
    queryFn,
    retry: 1,
  });
};
