// External Dependencies

// Internal Dependencies
import { Performance } from "../../redux/organizationSlice";

type PerformanceData = {
  concert_id: number | string | undefined;
  ensemble_id: number | string | undefined;
  piece_id: number | string | undefined;
};

export const addPerformanceApi = async (
  newPerformanceData: PerformanceData
): Promise<Performance> => {
  const res = await fetch("/api/performances", {
    method: "POST",
    body: JSON.stringify(newPerformanceData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return data;
  } else throw new Error(data.message);
};

export const deletePerformanceApi = async (
  performanceId: number | string
): Promise<any> => {
  const res = await fetch(`/api/performances/${performanceId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log("RES:", data);

  if (res.status === 204) {
    console.log("Performance successfully deleted");
  } else throw new Error(data.message);
};
