import { API_BASE_URL } from "../utils/constants";
import { ACPost } from "./user";
const isDevelopment = process.env.REACT_APP_ENVIRONMENT === "dev";

console.log(process.env.REACT_APP_ENVIRONMENT);
console.log(isDevelopment);

interface Visit {
  auth_id?: string;
  utm?: string;
  guest_name?: string;
  action: string;
}

export const trackAction = (visit: Visit) => {
  if (isDevelopment) return;
  console.log("inside", isDevelopment);
  return fetch(`${API_BASE_URL}track_action`, {
    ...ACPost(visit),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
