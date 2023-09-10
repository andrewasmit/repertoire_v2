
export const userSignOut = () => {
  fetch("/api/signout", {
    method: "DELETE",
  })
    .catch((err) => console.log("ERROR: ", err));
};
