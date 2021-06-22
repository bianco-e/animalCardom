import { API_BASE_URL } from "../utils/constants";
import { ACPost } from "./user";

interface Feedback {
  name?: string;
  message: string;
}

export const giveFeedback = (feedback: Feedback) => {
  return fetch(`${API_BASE_URL}give_feedback`, {
    ...ACPost(feedback),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
