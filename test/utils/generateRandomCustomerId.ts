import { padStart } from "lodash";

export const generateRandomCustomerId = () => {
  return `S${padStart(String(Math.floor(Math.random() * 10000000)), 7, "0")}H`;
};
