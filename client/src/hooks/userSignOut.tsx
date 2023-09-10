
export const userSignOut = () => {
  fetch("/api/signout", {
    method: "DELETE",
  })
    .then((data) => console.log("DATA: ", data))
    .catch((err) => console.log("ERROR: ", err));
};
