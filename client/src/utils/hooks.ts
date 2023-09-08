import { useCallback } from "react";
import { useAppDispatch } from "../redux/hooks";
import { signIn, signOut } from "../redux/userSlice";

const dispatch = useAppDispatch();

const login = (username: string, password: string) => {
  fetch("/api/signin", {
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

export const useLogin = useCallback((username: string, password: string) => {
  return login(username, password);
}, []);

export const useLogout = useCallback(() => {
  fetch("/api/signout", {
    method: "DELETE",
  })
    .then((data) => console.log("DATA: ", data))
    .catch((err) => console.log("ERROR: ", err));

  dispatch(signOut());
}, []);

export const fetchMeIfYouCan = () => {
  fetch("/api/me")
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => dispatch(signIn(data)));
      } else {
        console.log(" Probably unauthorized/Not logged in.");
      }
    })
    .catch((err) => console.log(err));
};
