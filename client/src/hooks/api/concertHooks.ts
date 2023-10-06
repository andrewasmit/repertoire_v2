// External Dependencies

// Internal Dependencies
import { ConcertResponse } from "../../redux/organizationSlice";

type ConcertData = {
  title: string;
  year: string;
  organization_id: number | undefined;
};

export const postNewConcert = async (
  newConcertData: ConcertData
): Promise<ConcertResponse> => {
  const res = await fetch("/api/concerts", {
    method: "POST",
    body: JSON.stringify(newConcertData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return data;
  } else throw new Error(data.message);
};

export const destroyConcert = async (
  concertId: number | string
): Promise<any> => {
  const res = await fetch(`/api/concerts/${concertId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.status === 204) {
    console.log("Concert successfully deleted");
  } else throw new Error(data.message);
};
