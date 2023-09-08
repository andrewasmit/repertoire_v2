import { useQuery } from "@tanstack/react-query"

const fetchData = (url: string): Promise<Group[]>=>{
  fetch(url)
  .then(res=>{
    if (res.ok){
      res.json()
    }
  })
}

export const useFetch = (url: string, key: string)=>{
  useQuery({
    queryKey: [`${key}`],
    queryFn: fetchData(url),
  })
};