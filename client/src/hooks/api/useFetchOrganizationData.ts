import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { OrganizationResponse } from "../../redux/organizationSlice";

export const fetchData = async (url: string): Promise<OrganizationResponse> => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else throw new Error(data.message);
};

export const useFetchOrganizationData = (url: string, key: string) => {
  const queryFn = useCallback(() => {
    return fetchData(url);
  }, [url]);

  return useQuery({
    queryKey: [`${key}`],
    queryFn,
    retry: 1,
  });
};
