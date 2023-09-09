import { useQuery } from "@tanstack/react-query"

import { useAppDispatch } from "../redux/hooks";
import { signIn, signOut } from "../redux/userSlice";

import { useNavigate } from "react-router-dom";

const dispatch = useAppDispatch();
const navigate = useNavigate();

export const userSignIn = (username: string, password: string) => {
  return fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch(signIn(data)))
    .catch((err) => console.log("ERROR: ", err));
};





export const userSignIn = async (url: string): Promise<{}>=>{
  return await fetch(url)
  .then(res=> {
    return res.json()
  })
}

export const useUserSignIn = (url: string, key: string)=>{
  return useQuery({ 
    queryKey: [`${key}`],
    queryFn: ()=>fetchData(url),
    retry: 1
  })
};