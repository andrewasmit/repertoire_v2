// Internal Dependencies
import { UserResponse } from "../redux/userSlice";


export interface Values {
  username: string;
  password: string;
}


export const userSignIn = async (values: Values): Promise<UserResponse> =>{
  const res = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({
      username: values.username,
      password: values.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200){
    return data;
  } else 
  throw new Error(data.message);
};
