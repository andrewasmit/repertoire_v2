import { useQuery } from "@tanstack/react-query"

import { useAppDispatch } from "../redux/hooks";
import { signIn, signOut } from "../redux/userSlice";

import { useNavigate } from "react-router-dom";

const dispatch = useAppDispatch();
const navigate = useNavigate();


export const useLogout = useCallback(() => {
  fetch("/api/signout", {
    method: "DELETE",
  })
    .then((data) => console.log("DATA: ", data))
    .catch((err) => console.log("ERROR: ", err));

  dispatch(signOut());
}, []);
