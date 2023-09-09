import { useQuery } from "@tanstack/react-query"

export const fetchData = async (url: string): Promise<{}>=>{
  return await fetch(url)
  .then(res=> {
    return res.json()
  })
}

export const useFetch = (url: string, key: string)=>{
  return useQuery({ 
    queryKey: [`${key}`],
    queryFn: ()=>fetchData(url),
    retry: 1
  })
};