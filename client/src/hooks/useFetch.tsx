import { useQuery } from "@tanstack/react-query"

export const fetchData = async (url: string)=>{
  fetch(url)
  .then(res=> {
    return res.json()
  })
  // .then(data=>console.log(data));
}

export const useFetch = (url: string, key: [])=>{
  return useQuery({ 
    queryKey: [`${key}`],
    queryFn: fetchData(url),
    retry: 1,
  })
};