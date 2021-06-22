import { API_BASE_URL } from "../utils/constants";
import { ACPost } from "./user";
const isDevelopment = process.env.REACT_APP_ENVIRONMENT === "dev";

interface Visit {
  auth_id?: string;
  utm?: string;
  guest_name?: string;
  action: string;
}

export const trackAction = (visit: Visit) => {
  if (isDevelopment) return;
  return fetch(`${API_BASE_URL}track_action`, {
    ...ACPost(visit),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
